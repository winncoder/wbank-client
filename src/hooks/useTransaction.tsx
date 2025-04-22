import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../constants/queryKey";
import { postTransactionAPI } from "../api/trainsaction.apiUrl";
import { message } from "antd";


interface CreateTransactionDto {
    amount: number;
    fromUserId: string;
    toUserId: string;
  }
export const useCreateTransaction = (userId?: string) => {
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: async (createTransaction: CreateTransactionDto) => {
            await new Promise(resolve => setTimeout(resolve, 3000));
            return postTransactionAPI(createTransaction);},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEY.TRANSACTION] });
            if (userId) {
				queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USER_DETAIL, userId] });
            }
            message.success('Transaction created successfully');
		},
		onError: (error: any) => {
			console.log(error);
			const errorMessage = error?.response?.data?.message || 'Transaction failed';
			message.error(errorMessage);
		},
	});
	return mutation;
};