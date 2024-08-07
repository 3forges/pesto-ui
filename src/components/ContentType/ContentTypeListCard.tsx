import { useState } from "preact/hooks";
import { Button, TextInput, Card, Toast } from "flowbite-react"
import { Spinner } from "flowbite-react"
import { KeyRound as LuKeyRound, SaveAll as LuSaveAll, BugIcon as LuErrorIcon, CheckIcon as LuSuccessIcon } from 'lucide-preact';
import {
  PestoContentTypeApiEntity,
} from "../../app/api/entities/PestoContentTypeApiEntity"/* from "../../features/PestoApi/ContentTypes/pestoContentTypeSlice"*/
import { useDeleteContentTypeMutation, useUpdateContentTypeMutation } from "../../app/api/endpoints/"


interface ListProps {
  contentType: PestoContentTypeApiEntity
  isEditModeOn?: boolean
}
interface ContentTypeListCardEditModeOnProps {
  contentType: PestoContentTypeApiEntity
  setIsEditModeOnHook: Function
  setContentTypeHook: Function
}

export function ContentTypeListCardEditModeOn({ contentType, setIsEditModeOnHook, setContentTypeHook }: ContentTypeListCardEditModeOnProps): JSX.Element {
  //const [editedContentType, setEditedContentType] = useState<PestoContentTypeApiEntity>(contentType);
  
      // Event handlers to update state variables
      const handleNameChange = (event: { target: { value: any; }; }) => {
        setContentTypeHook({
          ...contentType,
          name: event.target.value
        });
    };
    const handleDescChange = (event: { target: { value: any; }; }) => {
      setContentTypeHook({
        ...contentType,
        description: event.target.value
      });
  };
  const handleFrontmatterDefChange = (event: { target: { value: any; }; }) => {
    setContentTypeHook({
      ...contentType,
      frontmatter_definition: event.target.value
    });
};
const handleProjectIdChange = (event: { target: { value: any; }; }) => {
  setContentTypeHook({
    ...contentType,
    project_id: event.target.value
  });
};
  const [
    updateContentType,
    {
      data: updatedContentType,
      isLoading: updatingContentType,
      /* isUninitialized,*/
      isSuccess
    }
  ] = useUpdateContentTypeMutation();


  return (
      <>

<article class="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
              <div class="flex justify-between items-center mb-5 text-gray-500">
                  <span class="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                      {// <svg class="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path></svg>
                      }
                      <LuKeyRound />
                      ContentType id: {contentType._id}
                  </span>
                  <span class="text-sm">Created at: {contentType.createdAt}</span>
              </div>
              <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><a href="#">Edit project properties:</a></h2>
                <div class="p-2 w-full bg-gray-200 flex justify-center items-center">
                  <TextInput
                    id={`input_name_${contentType._id}`}
                    value={contentType.name}
                    type="text"
                    onchange={handleNameChange}
                    >ContentType name:
                  </TextInput>
                  <TextInput
                    id={`input_project_id_${contentType._id}`}
                    value={contentType.project_id}
                    type="text"
                    onchange={handleProjectIdChange}
                    >ContentType Project ID:
                  </TextInput>
                  <TextInput
                    id={`input_frontmatter_definition_${contentType._id}`}
                    value={contentType.frontmatter_definition}
                    type="text"
                    onchange={handleFrontmatterDefChange}
                    >ContentType Frontmatter matter:
                  </TextInput>
                  <TextInput
                    id={`input_description_${contentType._id}`}
                    value={contentType.description}
                    type="text"
                    onchange={handleDescChange}
                    >ContentType Description:
                  </TextInput>
                </div>
              {//
              }

              <div class="flex justify-between items-center">
                  <div class="flex items-center space-x-4">
                      <img class="w-7 h-7 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" alt="Jese Leos avatar" />
                      <span class="font-medium dark:text-white">
                          Jese Leos
                      </span>
                  </div>
                  <Button
                    className={`mt-2`}
                    type="submit"
                    onClick={async() => {
                      console.log(` >> CLICK UPDATE: `)
                      // const id: any = `${contentType._id}`
                      // const name: any = await document.getElementById(`input_name_${contentType._id}`)
                      // const project_id: any = await document.getElementById(`input_project_id_${contentType._id}`)
                      // const frontmatter_definition: any = await document.getElementById(`input_frontmatter_definition_${contentType._id}`)
                      // const desc: any = await document.getElementById(`input_description_${contentType._id}`)
                      
                      // const created: any = `${contentType.createdAt}`
                      // console.log(` Content Type Edit - id = [${id}]`)
                      // console.log(` Content Type Edit - name = [${name.value}]`)
                      // console.log(` Content Type Edit - desc = [${desc.value}]`)
                      // console.log(` Content Type Edit - project_id = [${project_id.value}]`)
                      // console.log(` Content Type Edit - frontmatter_definition = [${frontmatter_definition.value}]`)
                      // console.log(` Content Type Edit - created = [${created}]`)
                      // const V: any = document.getElementById(`${inputValue["_id"]+"__v"}`)
                      /*const editedContentType: PestoContentTypeApiEntity = {
                        _id: editedContentType,
                        name: name.value,
                        description: desc.value,
                        project_id: project_id.value,
                        frontmatter_definition: frontmatter_definition.value,
                        createdAt: created,
                        // __v: Math.floor(V.value*1),
                      }*/
                      console.log("editedContentType: ", contentType)

                      await setContentTypeHook(contentType);
                      await setIsEditModeOnHook(false);
                      await updateContentType({
                        _id: `${contentType._id}`,
                        name: contentType.name,
                        description: contentType.description,
                        project_id: contentType.project_id,
                        frontmatter_definition: contentType.frontmatter_definition,
                        createdAt: contentType.createdAt,
                      })

                      console.log(` # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- `)
                      console.log(` # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- `)
                      console.log(` # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- `)
                      console.log(` REDUX RTK - dans [ContentTypeListCardEditModeOn] - APRES[useUpdateContentTypeMutation] - !`)
                      // console.log(` REDUX RTK - dans [ContentTypeListCardEditModeOn] - APRES[useUpdateContentTypeMutation] - updatedContentTypeResponseData = [${JSON.stringify(updatedContentTypeResponseData, null, 4)}]`)
                      // console.log(` REDUX RTK - dans [ContentTypeListCardEditModeOn] - APRES[useUpdateContentTypeMutation] - updatedContentTypeResponseIsError = [${JSON.stringify(updatedContentTypeResponseIsError, null, 4)}]`)
                      // console.log(` REDUX RTK - dans [ContentTypeListCardEditModeOn] - APRES[useUpdateContentTypeMutation] - updatedContentTypeResponseIsFetching = [${JSON.stringify(updatedContentTypeResponseIsFetching, null, 4)}]`)
                      // console.log(` REDUX RTK - dans [ContentTypeListCardEditModeOn] - APRES[useUpdateContentTypeMutation] - updatedContentTypeResponseIsLoading = [${JSON.stringify(updatedContentTypeResponseIsLoading, null, 4)}]`)
                      // console.log(` REDUX RTK - dans [ContentTypeListCardEditModeOn] - APRES[useUpdateContentTypeMutation] - updatedContentTypeResponseIsSuccess = [${JSON.stringify(updatedContentTypeResponseIsSuccess, null, 4)}]`)
                      // console.log(` REDUX RTK - dans [ContentTypeListCardEditModeOn] - APRES[useUpdateContentTypeMutation] - updatedContentTypeResponseIsUninitialized = [${JSON.stringify(updatedContentTypeResponseIsUninitialized, null, 4)}]`)
                      
                      console.log(` # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- `)
                      console.log(` # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- `)
                      console.log(` # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- `)

                    }}
                  >
                    <LuSaveAll/>
                    
                    Update

                    {updatingContentType && (
                        <Spinner aria-label="Updating project..." />
                    ) || (
                      <span></span>
                    )}

                    {isSuccess && (
                      <span>
                        {// 
                        `${JSON.stringify(updatedContentType, null, 4)}`
                        }
                      </span>
                    ) || (
                      <span></span>
                    )}


                
                    
                    
                    

                  </Button>
              </div>
          </article>




          <div>


          </div>
      </>
  )
}
export function ContentTypeListCardEditModeOff(props: ListProps): JSX.Element {
  return (
    <>
      <div class="text-left">
        <div class="px-4 sm:px-0">
          <h3 class="text-base font-semibold leading-7 text-gray-900">Pesto ContentType Informations</h3>
          <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">ContentType details</p>
        </div>
        <div class="mt-6 border-t border-gray-100">
          <dl class="divide-y divide-gray-100">
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm font-medium leading-6 text-gray-900">ContentType Id</dt>
              <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{props.contentType._id}</dd>
            </div>
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm font-medium leading-6 text-gray-900">ContentType Name</dt>
              <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{props.contentType.name}</dd>
            </div>
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm font-medium leading-6 text-gray-900">ContentType Creation Date</dt>
              <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{props.contentType.createdAt}</dd>
            </div>
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm font-medium leading-6 text-gray-900">ContentType Description</dt>
              <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{props.contentType.description}</dd>
            </div>
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm font-medium leading-6 text-gray-900">ContentType Project ID</dt>
              <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{props.contentType.project_id}</dd>
            </div>
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm font-medium leading-6 text-gray-900">ContentType Frontmatter</dt>
              <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{props.contentType.frontmatter_definition}</dd>
            </div>
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm font-medium leading-6 text-gray-900">Attachments</dt>
              <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <ul role="list" class="divide-y divide-gray-100 rounded-md border border-gray-200">
                  <li class="flex justify-items-start content-start justify-between py-4 pl-4 pr-5 text-sm leading-6">
                    <div class="flex w-0 flex-1 justify-items-start content-start">
                      <svg class="h-5 w-5 flex-shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z" clip-rule="evenodd" />
                      </svg>
                      <div class="ml-4 flex min-w-0 flex-1 gap-2">
                        <span class="truncate font-medium">resume_back_end_developer.pdf</span>
                        <span class="flex-shrink-0 text-gray-400">2.4mb</span>
                      </div>
                    </div>
                    <div class="ml-4 flex-shrink-0">
                      <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Download</a>
                    </div>
                  </li>
                  <li class="flex justify-items-start content-start justify-between py-4 pl-4 pr-5 text-sm leading-6">
                    <div class="flex w-0 flex-1 justify-items-start content-start">
                      <svg class="h-5 w-5 flex-shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z" clip-rule="evenodd" />
                      </svg>
                      <div class="ml-4 flex min-w-0 flex-1 gap-2">
                        <span class="truncate font-medium">coverletter_back_end_developer.pdf</span>
                        <span class="flex-shrink-0 text-gray-400">4.5mb</span>
                      </div>
                    </div>
                    <div class="ml-4 flex-shrink-0">
                      <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Download</a>
                    </div>
                  </li>
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  )
}
/**
 * RENDER project TO PROJECT-CARD
 * @param props
 *  project: PestoContentTypeApiEntity => data to render
 *
 *  callback: FUNCTION  => (optional) parent javascript for buttons
 * @returns PROJECT-CARD + BUTTONS (optional)
 */
export function ContentTypeListCard(props: ListProps): JSX.Element {
  //console.log(props)
  
 
  // useEffect(() => {
  //   console.log(` [PestoContentTypeUI] Appel USE EFFECT [dispatch(RequestContentTypeList())]`)
  //   dispatch(RequestContentTypeList())
  // }, [dispatch])
  const [ isEditModeOn, setIsEditModeOn] = useState<boolean>(false);
  const [ contentType, setContentType] = useState<PestoContentTypeApiEntity>(props.contentType);
  const [deleteContentType, {
    isError: didDeletionThrowError,
    isSuccess: hasSuccessfullyDeletedContentType,
    isLoading: isDeletingContentType,
  }] = useDeleteContentTypeMutation();
  return (
    <>
      {// READONLY MODE
      }
      <Card>
      {isEditModeOn && (
                  <ContentTypeListCardEditModeOn setContentTypeHook={setContentType} setIsEditModeOnHook={setIsEditModeOn} contentType={contentType} />
                  ) || (
                  <ContentTypeListCardEditModeOff contentType={contentType} />
                  )
                }
      <div class="grid grid-cols-2 gap-2 z-0 p-3">
      <Button
              onClick={async() => {
                console.log(`Passage en mode Édition`)
                await setIsEditModeOn(true)
              }}
            >
              Edit
            </Button>
            <a href={`/content-type/${contentType._id}`}
               class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
               onClick={async() => {
                console.log(`Passage en mode Édition - Detail Page`)
                await setIsEditModeOn(true)
              }}
               >
            Edit with Detail Page

            </a>
            <Button
              onClick={async () => {
                await deleteContentType({
                  _id: `${contentType._id}`
                })
                // await dispatch(DeleteContentTypeById(`${project._id}`))
              }}
            >

              Remove
              {isDeletingContentType && (
                        <Spinner aria-label="Deleting project..." />
                    ) || (
                      <></>
                    )}

                    {hasSuccessfullyDeletedContentType && (

                      <>
                            <Toast>
                              <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                                <LuSuccessIcon className="h-5 w-5" />
                              </div>
                              <div className="ml-3 text-sm font-normal">ContentType {contentType.name} successfully deleted.</div>
                              <Toast.Toggle />
                            </Toast>                    
                      <span>
                        {// 
                        `${JSON.stringify(contentType, null, 4)}`
                        }
                      </span>
                      </>
                    ) || (
                      <></>
                    )}

                    {didDeletionThrowError && (
                          <Toast>
                            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                              <LuErrorIcon className="h-5 w-5" />
                            </div>
                            <div className="ml-3 text-sm font-normal">An error was encountered while trying to delete the {`${contentType.name}`} project:</div>
                            <div className="ml-3 text-sm font-normal">
                              <pre>
                                
                              </pre>
                            </div>
                            <Toast.Toggle />
                          </Toast>
                    ) || (
                      <></>
                    )}
            </Button>

            <a href={`/project/${contentType._id}/content-mgmt`}
               class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
               onClick={async() => {
                console.log(`Passage en mode Édition - Detail Page`)
                await setIsEditModeOn(true)
              }}
               >
            ContentType's content management

            </a>
      </div>
      </Card>
    </>
  )
}
