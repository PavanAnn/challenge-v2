import { useQuery } from '@tanstack/react-query'
import { getLocations } from '../Requests/DataRequest'

export function useGetLocations({ id }: { id?: string }) {
    return useQuery({
        queryKey: ['locations', id],
        queryFn: async () => getLocations(id!),
        enabled: !!id,
    })
}
