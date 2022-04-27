import {fetchBaseQuery} from '@reduxjs/toolkit/query';
import {getEnvironment} from '../config/environment';
import {EventModel} from '../model/Event';
import {createApi} from '@reduxjs/toolkit/dist/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({baseUrl: getEnvironment().apiHost}),
  tagTypes: ['events'],
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
      transformResponse: (res: EventModel[]) => {
        return res.map(event => ({
          ...event,
          cover: getRandomCover()
        }))
      }
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
