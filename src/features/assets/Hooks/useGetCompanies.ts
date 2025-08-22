import { useQuery } from '@tanstack/react-query'
import { getAssets } from '../Requests/DataRequest'

export function useGetAssets({ id }: { id?: string }) {

    return useQuery({
        queryKey: ['assets', id],
        queryFn: async () => {
            return getAssets(id!)
        },
        enabled: !!id,
    })
}