import {BaseQueryFn, FetchArgs, fetchBaseQuery} from '@reduxjs/toolkit/query';
import {getEnvironment} from '@app/config/environment';
import {EventModel} from '@app/model/Event';
import {createApi} from '@reduxjs/toolkit/dist/query/react';
import {RootState} from '@app/redux/store';
import {isFulfilled} from '@reduxjs/toolkit';

export const API_REDUCER_PATH = 'api';

const baseQuery = fetchBaseQuery({
  baseUrl: getEnvironment().apiHost,
  prepareHeaders: async (headers, {getState}) => {
    const token = (getState() as RootState).securePersisted.openID.token;

    if (token) headers.set('Authorization', `Bearer ${token}`)
    return headers
  }
})

// const baseQueryWithRefresh: BaseQueryFn<string | FetchArgs> =
// async (args, api, extraOptions) => {
//   console.log('Making query')
//   let res = await baseQuery(args, api, extraOptions);
//   if (res.error && (res.error.status === 401 || (res.error.status === 'PARSING_ERROR' && res.error.originalStatus === 401))) {
//     console.log('Request errored, refreshing token')
//     const refreshResult = await api.dispatch(refreshToken())
//     if (isFulfilled(refreshResult)) {
//       console.log('Token refreshed')
//       res = await baseQuery(args, api, extraOptions);
//       console.log('Retried request with res', res.meta?.response?.status)
//       if (!!res.error) {
//         api.dispatch(signOutApp());
//       }
//     } else {
//       console.log('Refreshing token failed, using client credentials')
//       api.dispatch(signOutApp());
//       await api.dispatch(signInClientCredentials())
//       res = await baseQuery(args, api, extraOptions);
//     }
//   }
//   return res;
// }

export const api = createApi({
  baseQuery: baseQuery,
  tagTypes: ['events'],
  reducerPath: API_REDUCER_PATH,
  endpoints: (builder) => ({
    getEvents: builder.query<EventModel[], {page: number, pageSize: number}>({
      query: (params) => ({
        url: `/e/events`,
        params: {
          Start: params.page,
          PageSize: params.pageSize,
        }
      }),
      providesTags: ['events'],
      transformResponse (res: EventModel[]) {
        return res.map(event => ({
          ...event,
          cover: getRandomCover()
        }))
      },
    }),
  })
})

const covers = [
  'https://www.sonica.mx/u/fotografias/m/2021/7/14/f1280x720-5561_137236_5050.jpg',
  'https://d35kvm5iuwjt9t.cloudfront.net/dbimages/sfx252009.jpg',
  'https://e00-marca.uecdn.es/assets/multimedia/imagenes/2022/01/24/16430573923566.jpg',
  'https://mexinius.files.wordpress.com/2022/03/maroon5.jpeg',
  'https://cdn.ciudad.com.ar/sites/default/files/styles/nota_portada_crop/public/nota/2022/03/31/primavera_sound.jpg?itok=-5tQ33HC'
]

const getRandomCover = () => {
  return covers[Math.floor(Math.random() * covers.length)]
};

export const {useGetEventsQuery} = api;
