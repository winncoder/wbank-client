// Payment.tsx
import{ useState } from 'react';
import { Select, InputNumber, Button, Card, Divider, Skeleton, message, Modal} from 'antd';
import './Payment.css';
import { useGetUserDetail, useGetUsers } from '../../../hooks/useUser';
import { useCreateTransaction } from '../../../hooks/useTransaction';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { userState } from '../../../recoil/atoms/userAtom';


const { Option } = Select;
  
  export default function Payment() {
    const [amount, setAmount] = useState<number>(0);
    const [recipient, setRecipient] = useState<string>('');
  
    const myInfo = useRecoilValue(userState);
    const myUserId = myInfo?.sub;
    const resetUser = useResetRecoilState(userState);

    const { data: users, isPending: isUsersLoading } = useGetUsers({ username: recipient });
  
    const { data: user, isPending: isUserDetailLoading } = useGetUserDetail(myUserId || '');


    const selectedRecipient = users?.data.find((u: any) => u.username === recipient);

    const { mutate: createTransaction, isPending: createTransactionLoading } = useCreateTransaction(myUserId || '');
    const [visible, setVisible] = useState(false);
    const handleTransactionCreateOk = async () => {
      try {
        const isAmount = amount;
        if (!isAmount) {
          message.error('Please enter amount');
          return;
        }

        if (!selectedRecipient) {
          message.error('Please select a valid recipient!');
          return;
        }

        createTransaction({
          amount: isAmount,
          fromUserId: myUserId!,
          toUserId: selectedRecipient.id,
        });
        setVisible(false);
        setAmount(0);
      } catch (error) {
        console.log(error);
        message.error('Failed to transaction');
      }
    };
    
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    resetUser();
    window.location.href = '/auth';
  };

  return (
    <div className="payment-container">
      <div className="sidebar">
        <div>
          <div className="profile">
            <img src="https://i.pravatar.cc/48" alt="user" />
            <div>
            <Skeleton loading={isUserDetailLoading} active paragraph={false}>
              <h4>{user?.username}</h4>
              <p>{user?.email}</p>
            </Skeleton>
            </div>
          </div>
          <div className="menu">
            <p>Services</p>
            <p className=''>Transactions</p>
            <p className="active">Send Money</p>
            <p>Cards</p>
            <p>History</p>
          </div>
        </div>
        <div className="bottom-menu">
            <p>Settings</p>
            <p onClick={handleLogout} style={{ cursor: 'pointer', color: 'red' }}>Log Out</p>
        </div>
      </div>

      <div className="payment-main">
        <h2>Send Money</h2>
        <p className="balance">Balance: <span>{user?.balance} VND</span></p>

        <Card className="transfer-card">
          <div className="field-group">
            <label>From</label>
            <InputNumber
              min={0}
              value={amount}
              onChange={val => setAmount(val || 0)}
              formatter={value => `₫ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              className="amount-input"
            />
          </div>

          <div className="field-group">
            <label>Recipient</label>
            <Select
              placeholder="Select recipient"
              value={recipient}
              onChange={setRecipient}
              className="recipient-select"
              loading={isUsersLoading}
              showSearch
              optionFilterProp="children"
            >
              {users?.data
              ?.filter((user: any) => user.id !== myUserId)
              .map((user: any) => (
                <Option key={user.id} value={user.username}>
                  {user.username}
                </Option>
              ))}
            </Select>
          </div>
        </Card>

        <Divider />

        <Card className="payment-details">
          <p><strong>Sending:</strong> ₫ {amount.toLocaleString()}</p>
          <p><strong>Fee (0.1%):</strong> ₫ {(amount * 0.001).toLocaleString()}</p>
          <Button
            type="primary"
            className="confirm-btn"
            onClick={() => setVisible(true)}
            loading={createTransactionLoading}
          >
            Confirm
          </Button>

        </Card>

        <Modal
        open={visible}
        title="Confrim transaction"
        onOk={handleTransactionCreateOk}
        onCancel={() => setVisible(false)}
        confirmLoading={createTransactionLoading}
        okText="Confirm"
        cancelText="Cancel"
      >
        <p>Do you want send {amount.toLocaleString()} VND to {recipient}?</p>
      </Modal>
      </div>
    </div>
  );
};
