import { useQuery } from '@tanstack/react-query'
import { getCompanies } from '../Requests/DataRequest'

export function useGetCompanies() {

    return useQuery({
        queryKey: ['companies'],
        queryFn: async () => {
            return getCompanies()
        },
        staleTime: 1000 * 60 * 30,
        gcTime: 1000 * 60 * 30,         // 30min cache, companies fetch is not very often 
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    })
}