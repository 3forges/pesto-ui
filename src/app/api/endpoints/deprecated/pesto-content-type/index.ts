import {
    createApi,
    fetchBaseQuery,
    // ApiEndpointQuery,
  } from "@reduxjs/toolkit/query/react";

import { PestoContentTypeApiEntity } from "./../../entities/PestoContentTypeApiEntity";
  
  const config = {
    PESTO_API_PORT: process.env.PESTO_API_PORT || `3000`,
    PESTO_API_HOST: process.env.PESTO_API_HOST || `localhost`,
    PESTO_API_HTTP_SCHEME: process.env.PESTO_API_HTTP_SCHEME || `http`,
  };
  // const PESTO_API_PORT = process.env.PESTO_API_PORT || "3000"
  const PESTO_API_PORT = config.PESTO_API_PORT;
  // const PESTO_API_HOST = process.env.PESTO_API_HOST || "localhost"
  const PESTO_API_HOST = config.PESTO_API_HOST;
  const PESTO_API_HTTP_SCHEME = config.PESTO_API_HTTP_SCHEME;
  const API_BASE_URL = `${PESTO_API_HTTP_SCHEME}://${PESTO_API_HOST}:${PESTO_API_PORT}/`;
  
  export const Api = createApi({
    baseQuery: fetchBaseQuery({
      baseUrl: API_BASE_URL,
    }),
    // global configuration for the api
    /**
     * https://redux-toolkit.js.org/rtk-query/usage/cache-behavior#reducing-subscription-time-with-keepunuseddatafor
     */
    keepUnusedDataFor: 30,
    /**
     * https://redux-toolkit.js.org/rtk-query/usage/cache-behavior#encouraging-re-fetching-with-refetchonmountorargchange
     */
    refetchOnMountOrArgChange: 17,
    /**
     * https://redux-toolkit.js.org/rtk-query/usage/cache-behavior#re-fetching-on-window-focus-with-refetchonfocus
     */
    refetchOnFocus: true,
    /**
     * https://redux-toolkit.js.org/rtk-query/usage/cache-behavior#re-fetching-on-network-reconnection-with-refetchonreconnect
     */
    refetchOnReconnect: true,
    tagTypes: ['PestoContentTypeApiEntity'],
    endpoints: (build) => ({

      /*************************************
       * -----------------------------------
       * -----------------------------------
       * Pesto Content Types
       * -----------------------------------
       * -----------------------------------
       *************************************/
      createNewContentType: build.query<
      PestoContentTypeApiEntity[],
        {
          v_name: string;
          v_project_id: string;
          v_frontmatter_definition: string;
          v_description: string;
        }
      >({
        query({ v_name, v_project_id, v_frontmatter_definition, v_description }) {
          console.log(` RTK QUERY - I am the [createNewContentType]`);
          return {
            window: null, // Can only be null. Used to disassociate request from any Window.
            url: "pesto-content-type",
            /* params: {
                limit: 10
              }, */
            method: "POST",
            body: {
              name: `${v_name}`,
              project_id: `${v_project_id}`,
              frontmatter_definition: `${v_frontmatter_definition}`,
              description: `${v_description}`,
            },
          };
        },
      }),
      contentTypeList: build.query<PestoContentTypeApiEntity[], void>({
        query() {
          console.log(` RTK QUERY - I am the [contentTypeList]`);
          return {
            url: "pesto-content-type",
            params: {
              limit: 10,
            },
            method: "GET",
          };
        },
        // configuration for an individual endpoint, overriding the api setting
        keepUnusedDataFor: 0,
      }),
      contentTypeDetail: build.query<
      PestoContentTypeApiEntity,
        {
          _id?: string;
          name?: string;
          project_id?: string;
          frontmatter_definition?: string;
          description?: string;
          createdAt?: string;
        }
      >({
        query: ({ _id }) => {
          console.log(" RTK QUERY - I am the [contentTypeDetail] query Fn ", _id);
          return { url: `pesto-content-type/${_id}` };
        },
        // configuration for an individual endpoint, overriding the api setting
        keepUnusedDataFor: 0,
      }),
      /**
       * Updating a Pesto ContentType (should be a `PestoContentType`)
       */
      // // - //    updateStudent: build.mutation({
      // // - //        query(stu) {
      // // - //            return {
      // // - //                url: `students/${stu.id}`,
      // // - //                method: 'put',
      // // - //                body: {data: stu.attributes}
      // // - //            };
      // // - //        },
      // // - //        invalidatesTags: ((result, error, stu) =>
      // // - //            [{type: 'student', id: stu.id}, {type: 'student', id: 'LIST'}])
      // // - //    }),
  
      /**
       * see those ref examples found on github : 
       * -> https://github.com/csxiaoyaojianxian/JavaScriptStudy/blob/d1fc42736b41e05139bc1bd8b4c6adf0842dac11/12-%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/03-React/react18/16-redux/03-RTKQ(TODO)/store/studentApi.js#L59C44-L59C44
       */
      updateContentType: build.mutation<
      PestoContentTypeApiEntity,
      {
        _id?: string;
        name?: string;
        project_id?: string;
        frontmatter_definition?: string;
        description?: string;
        createdAt?: string;
      }>({
        query: ({
          _id,
          name,
          project_id,
          frontmatter_definition,
          description,
          createdAt,
        }) => {
          console.log(` RTK QUERY - I am the [updateContentType]`);
          console.log({
            _id,
            name,
            project_id,
            frontmatter_definition,
            description,
            createdAt,
          })
          return ({
            // url: '/posts',
            // url: `pesto-content-type/${payload._id}`,
            url: `pesto-content-type/${_id}`,
            method: 'PUT',
            body: {
              _id: `${_id}` ,
              name: `${name}` ,
              project_id: `${project_id}` ,
              frontmatter_definition: `${frontmatter_definition}` ,
              description: `${description}` ,
              createdAt: `${createdAt}` ,
            }/*,
            body: {
              data: {
                _id: `${_id}` ,
                name: `${name}` ,
                git_ssh_uri: `${git_ssh_uri}` ,
                description: `${description}` ,
                createdAt: `${createdAt}` ,
              }
            }*/,
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
              'Accept': 'application/json; charset=UTF-8',
            },
          })
        },
        /*
        providesTags: (result: { id: any; }[]) =>
        result
          ? [
            ///
              ...result.map((value: { id: any; }, index: number, array: { id: any; }[]) => ({ type: 'PestoContentTypeApiEntity' as const, value })),
              { type: 'PestoContentTypeApiEntity', id: 'LIST' },
            ]
          : [{ type: 'PestoContentTypeApiEntity', id: 'LIST' }],
        */
        invalidatesTags: ((result, error, {
          _id,
          name,
          project_id,
          frontmatter_definition,
          description,
          createdAt,
        }) => 
          {
            console.log(` RTK QUERY - I am the [updatePestoContentType] - [invalidatesTags] Hook `)
            console.log(` RTK QUERY - I am the [updatePestoContentType] - [invalidatesTags]  CHECK VALUE OF [result] = [${JSON.stringify(result, null, 4)}] `)
            console.log(` RTK QUERY - I am the [updatePestoContentType] - [invalidatesTags]  CHECK VALUE OF [error] = [${JSON.stringify(error, null, 4)}] `)
  
            console.log(` RTK QUERY - I am the [updatePestoContentType] - [invalidatesTags]  CHECK VALUE OF [_id] = [${_id}] `)
            console.log(` RTK QUERY - I am the [updatePestoContentType] - [invalidatesTags]  CHECK VALUE OF [name] = [${name}] `)
            console.log(` RTK QUERY - I am the [updatePestoContentType] - [invalidatesTags]  CHECK VALUE OF [project_id] = [${project_id}] `)
            console.log(` RTK QUERY - I am the [updatePestoContentType] - [invalidatesTags]  CHECK VALUE OF [frontmatter_definition] = [${frontmatter_definition}] `)
            console.log(` RTK QUERY - I am the [updatePestoContentType] - [invalidatesTags]  CHECK VALUE OF [description] = [${description}] `)
            console.log(` RTK QUERY - I am the [updatePestoContentType] - [invalidatesTags]  CHECK VALUE OF [createdAt] = [${createdAt}] `)
            
            
            return [
              {type: 'PestoContentTypeApiEntity', id: `${_id}`},
              //{type: 'PestoContentTypeApiEntity', id: `${name}`},
              //{type: 'PestoContentTypeApiEntity', id: `${git_ssh_uri}`},
              //{type: 'PestoContentTypeApiEntity', id: `${description}`},
              //{type: 'PestoContentTypeApiEntity', id: `${createdAt}`},
            ]
          }
        )
        // invalidatesTags: ((result, error, stu) =>
        //   [{type: 'PestoContentTypeApiEntity', id: `${_id}`}, {type: 'PestoContentTypeApiEntity', id: 'LIST'}])
        // invalidatesTags: ['PestoContentTypeApiEntity'],
        
      }),
      deleteContentType: build.mutation<
        PestoContentTypeApiEntity,
        {
          _id?: string;
          name?: string;
          git_ssh_uri?: string;
          description?: string;
          createdAt?: string;
        }
      >({
        query: ({ _id }) => {
          console.log(` RTK QUERY - I am the [deleteContentType] query Fn [/pesto-content-type/${_id}]`, _id);
          // return { url: `pesto-content-type/${_id}` };
          return {
            url: `pesto-content-type/${_id}`,
            /* params: {
                limit: 10
              }, */
            method: "DELETE",
          };
        },
      }),
  
    }),
  });
  
  export const {
    /**
     * Pesto Content Types
     */
    useCreateNewContentTypeQuery,
    useUpdateContentTypeMutation,
    useContentTypeListQuery,
    useDeleteContentTypeMutation,
    useContentTypeDetailQuery,
//  } = pestoContentTypeApi;
} = Api;