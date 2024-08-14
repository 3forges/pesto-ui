import { useState } from "preact/hooks";
import { Button, TextInput, Card, Toast, Alert } from "flowbite-react"
import { Spinner } from "flowbite-react"
import { KeyRound as LuKeyRound, SaveAll as LuSaveAll, BugIcon as LuErrorIcon, CheckIcon as LuSuccessIcon, BellIcon, Plus as LuPlus } from 'lucide-preact';
import {
  PestoContentTypeApiEntity,
} from "../../app/api/entities/PestoContentTypeApiEntity"/* from "../../features/PestoApi/ContentTypes/pestoContentTypeSlice"*/
import { useDeleteContentTypeMutation, useProjectListQuery, useUpdateContentTypeMutation } from "../../app/api/endpoints/"
import { PestoProjectApiEntity } from "../../app/api/entities/PestoProjectApiEntity";
import { TargetedEvent } from "preact/compat";
import { fmBooleanType, fmNumberType, fmStringType, fmUnSelectedType, FrontmatterField, FrontMatterFieldType } from "./ContentTypeContext";


interface ContentTypeListCardProps {
  contentType: PestoContentTypeApiEntity
  isEditModeOn?: boolean
}
interface ContentTypeListCardEditModeOnProps {
  contentType: PestoContentTypeApiEntity
  setIsEditModeOnHook: Function
  setContentTypeHook: Function
}

/**
 * - 
 * The "GoodExampleForm" is just a code snippet I want to
 * keep, just for usage in other pages in future, like 
 * forms where integer values must be constrained on a
 * field.
 * - 
 * @param param0 
 * @returns 
 */
export function GoodExampleForm({ contentType, setIsEditModeOnHook, setContentTypeHook }: ContentTypeListCardEditModeOnProps): JSX.Element {
  console.log(`${contentType}, ${setIsEditModeOnHook}, ${setContentTypeHook}`) // this line has to be removed

  return (
    <>


      <section class="bg-cyan-500 dark:bg-cyan-300  rounded-lg">
        <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new product</h2>
          <form action="#">
            <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">

              <div class="sm:col-span-2">
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID</label>
                <div class="relative">
                  <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <LuKeyRound />
                  </div>
                  <input type="text" id="email-address-icon" class="cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" disabled />
                </div>
              </div>


              {
                //<!-- below: disabled -->
              }
              <div class="sm:col-span-2">
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
                <input type="text" name="name" id="name" class="cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required={true} disabled />
              </div>


              <div class="sm:col-span-2">
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
                <input type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required={true} />
              </div>


              <div class="w-full">
                <label for="brand" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brand</label>
                <input type="text" name="brand" id="brand" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Product brand" required={true} />
              </div>
              <div class="w-full">
                <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                <input type="number" name="price" id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" required={true} />
              </div>
              <div>
                <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                <select id="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                  <option selected={true}>Select category</option>
                  <option value="TV">TV/Monitors</option>
                  <option value="PC">PC</option>
                  <option value="GA">Gaming/Console</option>
                  <option value="PH">Phones</option>
                </select>
              </div>
              <div>
                <label for="item-weight" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item Weight (kg)</label>
                <input type="number" name="item-weight" id="item-weight" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="12" required={true} />
              </div>
              <div class="sm:col-span-2">
                <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                <textarea id="description" rows={8} class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Your description here"></textarea>
              </div>
            </div>
            <button type="submit" class="my-3 focus:outline-none text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-900">
              Add product
            </button>
          </form>
        </div>
      </section>
    </>
  )

}

export interface FrontmatterInputProps {
  field_index: number,
  name?: string,
  fmType?: FrontMatterFieldType,
  setFrontmatterFieldListState: FrontmatterField[],
  setFrontmatterFieldListHook: Function
}
export function FrontmatterInput({ field_index, name: p_name = "", setFrontmatterFieldListState, setFrontmatterFieldListHook }: FrontmatterInputProps): JSX.Element {

  // const [field_index_in_array, setField_index_in_array] = useState<number>(field_index)
  const [name, setName] = useState<string>(p_name)
  const [fmType, setFmType] = useState<string>(fmUnSelectedType)

  const handleFrontmatterFieldNameChange = (event: { target: { value: any; }; } | any) => {
    // event.persist()
    console.log(` handleFrontmatterFieldNameChange -> event.target.value = `, event.target?.value)
    console.log(` handleFrontmatterFieldNameChange -> field_index = `, field_index)
    setName(event.target?.value);
    console.log(` handleFrontmatterFieldNameChange -> setFrontmatterFieldListState = `, setFrontmatterFieldListState)
    let newArr = [...setFrontmatterFieldListState]; // copying the old datas array
    console.log(` handleFrontmatterFieldNameChange -> newArr = `, newArr)
    console.log(` handleFrontmatterFieldNameChange -> newArr.length = `, newArr.length)
    console.log(` handleFrontmatterFieldNameChange -> newArr[field_index] = `, newArr[field_index])
    
    
    // a deep copy is not needed as we are overriding the whole object below, and not setting a property of it. this does not mutate the state.
    newArr[field_index].name = event.target.value;
    
    // setFrontmatterFieldListHook(newArr)
  };

  const handleFrontmatterFieldTypeChange = (event: TargetedEvent<HTMLSelectElement, Event> | any) => {
    console.log(` handleFrontmatterFieldTypeChange -> event.target = [${event.target}]`)
    console.log(` handleFrontmatterFieldTypeChange -> event.target = `, event.target)
    console.log(` handleFrontmatterFieldTypeChange -> event.currentTarget = `, event.currentTarget)
    console.log(` handleFrontmatterFieldTypeChange -> event.target.value = `, event.target?.value) // there is a compilation error on value, but yet the selected value is indeed retrieved, the project id of the selected project.
    let newFrontmatterFieldTypeValue: FrontMatterFieldType;

    switch (event.target?.value) {
      case fmStringType: {
        newFrontmatterFieldTypeValue = "fmString"
        //statements; 
        break;
      }
      case fmBooleanType: {
        newFrontmatterFieldTypeValue = "fmBoolean"
        //statements; 
        break;
      }
      case fmNumberType: {
        newFrontmatterFieldTypeValue = "fmNumber"
        //statements; 
        break;
      }
      case fmUnSelectedType: {
        newFrontmatterFieldTypeValue = "fmUnSelectedType"
        //statements; 
        break;
      }
      default: {
        //statements;
        throw new Error(`handleFrontmatterFieldTypeChange -> Cannot determine which frontmatter field type from selected [${event.target?.value}]`)
        //break; 
      }
    }
    setFmType(newFrontmatterFieldTypeValue);
    let newArr = [...setFrontmatterFieldListState]; // copying the old datas array
    // a deep copy is not needed as we are overriding the whole object below, and not setting a property of it. this does not mutate the state.
    newArr[field_index].fmType = newFrontmatterFieldTypeValue;
    
    setFrontmatterFieldListHook(newArr)
  };


  return (
    <>
      {
        /*
        <div class="w-full">
          <label for="fmFieldName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Field name</label>
          <input type="text" name="fmFieldName" id="fmFieldName" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Field Name" required={true} />
        </div>
        */
      }

      <div class="w-full">
        <label for="fmFieldName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Field name</label>
        <TextInput
          type="text"
          name={`fmFieldName_${field_index}`}
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder="Type Field Name"
          required={true}
          id={`fmFieldName_${field_index}`}
          value={name || "Type Field Name"}
          onchange={handleFrontmatterFieldNameChange}
        />
      </div>
      <div>
        <label for={`fmFieldType_select_${field_index}`} class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Field Type</label>
        <select
          onChange={handleFrontmatterFieldTypeChange}
          id={`fmFieldType_select_${field_index}`}
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        >
          <option selected={(fmType == fmUnSelectedType)}>Select Field Type</option>
          <option selected={(fmType == fmStringType)} value={fmStringType}>String</option>
          <option selected={(fmType == fmBooleanType)} value={fmBooleanType}>Boolean</option>
          <option selected={(fmType == fmNumberType)} value={fmNumberType}>Number</option>
        </select>
      </div>
    </>
  )
}
export function ContentTypeListCardEditModeOnRedesigned({ contentType, setIsEditModeOnHook, setContentTypeHook }: ContentTypeListCardEditModeOnProps): JSX.Element {
  /**
   * frontmatterFieldList : 
   * so that's the list of fields in frontmatter
   * for each field there is a component including one input for the name, and one select for the type chosen among string, boolean, or number (date and image are not supported yet, I start very simple)
   * 
   * its inital value will be set by transforming the FrontMatter Type retrieved from database in the form of a typescript interface...
   */
  const [frontmatterFieldInputList, setFrontmatterFieldInputList] = useState<any[]>([]);
  const [frontmatterFieldList, setFrontmatterFieldList] = useState<FrontmatterField[]>([]);

  /**
   * 
   * @param event 
   * 
   * Ref. notes:
   * Interesting about [event.persist()] - any hook that sets a state, provokes interferences with an event handler, cf. https://stackoverflow.com/questions/58106099/react-onclick-not-firing-on-first-click-second-click-behaves-as-expected-simpl
   */
  const handleAddFrontMatterFieldInput = (event: { target: { value: any; }; } | any) => {
  // const handleAddFrontMatterFieldInput = () => {
    event.persist();
    console.log(` handleAddFrontMatterFieldInput - begin call `)
    
    const newfmField: FrontmatterField = {
      name: "Default field name",
      fmType: "fmUnSelectedType"
    }
    console.log(` handleAddFrontMatterFieldInput - frontmatterFieldList BEFORE adding new field: `, frontmatterFieldList)
    const newfrontmatterFieldListArr = [...frontmatterFieldList]
    newfrontmatterFieldListArr.push(newfmField)
    // .concat();
    setFrontmatterFieldList(newfrontmatterFieldListArr);
    console.log(` handleAddFrontMatterFieldInput - frontmatterFieldList AFTER adding new field: `, frontmatterFieldList)
    const newfrontmatterFieldInputListArr = [...frontmatterFieldInputList]
    newfrontmatterFieldInputListArr.push(<FrontmatterInput field_index={frontmatterFieldInputList.length} name="default_name" setFrontmatterFieldListState={frontmatterFieldList} setFrontmatterFieldListHook={setFrontmatterFieldList} />)
    setFrontmatterFieldInputList(newfrontmatterFieldInputListArr);
  };
  // Event handlers to update state variables
  const handleNameChange = (event: { target: { value: any; }; } | any) => {
    // event.persist();
    setContentTypeHook({
      ...contentType,
      name: event.target.value
    });
  };
  // const handleDescChange = (event: { target: { value: any; }; }) => {
  const handleDescChange = (event: TargetedEvent<HTMLSelectElement, Event> | any) => {
    console.log(` handleDescChange -> event.target = [${event.target}]`)
    console.log(` handleDescChange -> event.target = `, event.target)
    console.log(` handleDescChange -> event.currentTarget = `, event.currentTarget)
    console.log(` handleDescChange -> event.target.value = `, event.target?.value)
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


  // const handleProjectIdChange = (event: { target: any; }) => {
  const handleProjectIdChange = (event: TargetedEvent<HTMLSelectElement, Event> | any) => {
    // const handleProjectIdChange = (event: { target: { value: any; }; }) => {
    // const handleProjectIdChange = (project_id: string) => {
    console.log(` handleProjectIdChange -> event.target = [${event.target}]`)
    console.log(` handleProjectIdChange -> event.target = `, event.target)
    console.log(` handleProjectIdChange -> event.currentTarget = `, event.currentTarget)
    console.log(` handleProjectIdChange -> event.target.value = `, event.target?.value) // there is a compilation error on value, but yet the selected value is indeed retrieved, the project id of the selected project.
    // console.log(` handleProjectIdChange -> value = `, value)
    setContentTypeHook({
      ...contentType,
      // project_id: project_id
      // project_id: event.target.value
      project_id: event.target?.value
    });
  };
  /*
  const [
    updateContentType,
    {
      data: updatedContentType,
      isLoading: updatingContentType,
      // isUninitialized,
      isSuccess
    }
  ] = useUpdateContentTypeMutation();
  */
  const { data: pestoProjectListData = [], isLoading, isError, isUninitialized, isSuccess } = useProjectListQuery()
  if (isLoading || isUninitialized) {
    return (<div>
      <Alert className={`m-5`}><Spinner aria-label="Loading..." className={`rounded bg-cyan-300 text-yellow-300 p-1 ml-2 mr-2`} />Loading <code>Pesto Content Types</code> ...</Alert>
    </div>
    )

  }
  if (isError) {
    return (<div>
      <Alert>something went wrong fetching Pesto Projects for COntent Type {`${contentType.name}`} !</Alert>
    </div>)
  }
  return (
    <>

      {isSuccess ? (
        <Toast>
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
            {//<HiCheck className="h-5 w-5" />
            }
            <BellIcon className="h-5 w-5" />
            {//Highlighter, HandIcon, EyeOffIcon, EyeIcon, HopIcon, 
            }
          </div>
          <div className="ml-3 text-sm font-normal">Pesto Project Items loaded successfully.</div>
          <Toast.Toggle />
        </Toast>

      ) : (
        <></>
      )
      }


      <section class="bg-cyan-500 dark:bg-cyan-300  rounded-lg">
        <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Edit Content Type</h2>
          <form action="#">
            <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">

              <div class="sm:col-span-2">
                {
                  // left key
                }
                <div class="flex justify-between items-center mb-5 text-gray-500">
                  <span class="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                    {// <svg class="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path></svg>
                    }
                    <LuKeyRound className={`mx-2`} />
                    {contentType._id}
                  </span>
                  <span class="text-sm">Created at: {contentType.createdAt}</span>
                </div>


              </div>

              <div class="sm:col-span-2">
                <label for={`input_name_${contentType._id}`} class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                <TextInput
                  type="text"
                  name="name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type product name"
                  required={true}
                  id={`input_name_${contentType._id}`}
                  value={contentType.name || "Type product name"}
                  onchange={handleNameChange}
                />
              </div>




              <div class="sm:col-span-2">
                <label for="project_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project</label>
                <select
                  onChange={handleProjectIdChange}
                  id="project_id"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >

                  {(isLoading || isUninitialized) ? (
                    <div>
                      <Alert className={`m-5`}><Spinner aria-label="Loading..." className={`rounded bg-cyan-300 text-yellow-300 p-1 ml-2 mr-2`} />Loading <code>Pesto Content Types</code> ...</Alert>
                    </div>

                  ) : (
                    <></>
                  )
                  }
                  {pestoProjectListData &&
                    pestoProjectListData[0] &&
                    pestoProjectListData[0]._id !== 0 &&
                    pestoProjectListData.map((project: PestoProjectApiEntity, index: number) => {
                      return (
                        <option
                          value={`${project._id}`}
                          selected={(`${project._id}` == `${contentType.project_id}`)}
                        >{`${project.name} (ID: ${project._id})`}
                        </option>
                      )
                    }
                    )}

                </select>
              </div>
              <div class="sm:col-span-2">
                <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                <textarea
                  id="description"
                  rows={8}
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Your description here"
                  onChange={handleDescChange}
                >{contentType.description}</textarea>
              </div>




              <div class="sm:col-span-2 inline-flex shadow-sm" role="group">
                <button type="button" class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                  Profile
                </button>

              </div>

              <hr class="sm:col-span-2" />

              <h4 class="sm:col-span-2 mb-4 text-md font-bold text-gray-900 dark:text-white">Frontmatter</h4>
              <div class="sm:col-span-2 inline-flex shadow-sm">
              <button
                type="button"
                onClick={handleAddFrontMatterFieldInput}
                class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                <LuPlus />
              </button>
              </div>

                  {
                    frontmatterFieldInputList
                  }

              <hr class="sm:col-span-2" />
            </div>
            <button type="submit" class="my-3 mt-8 focus:outline-none text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-900">
             Save (Update content type)
            </button>
          </form>
        </div>
      </section>
    </>
  )

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


      <ContentTypeListCardEditModeOnRedesigned contentType={contentType}
        setIsEditModeOnHook={setIsEditModeOnHook}
        setContentTypeHook={setContentTypeHook} />


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
        <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><a href="#">Edit Content Type Properties:</a></h2>
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
            onClick={async () => {
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
            <LuSaveAll />

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
export function ContentTypeListCardEditModeOff(props: ContentTypeListCardProps): JSX.Element {
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
export function ContentTypeListCard(props: ContentTypeListCardProps): JSX.Element {
  //console.log(props)


  // useEffect(() => {
  //   console.log(` [PestoContentTypeUI] Appel USE EFFECT [dispatch(RequestContentTypeList())]`)
  //   dispatch(RequestContentTypeList())
  // }, [dispatch])
  const [isEditModeOn, setIsEditModeOn] = useState<boolean>(props.isEditModeOn || false);
  const [contentType, setContentType] = useState<PestoContentTypeApiEntity>(props.contentType);
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
            onClick={async () => {
              console.log(`Passage en mode Édition`)
              await setIsEditModeOn(true)
            }}
          >
            Edit
          </Button>
          <a href={`/content-type/${contentType._id}`}
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={async () => {
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
            onClick={async () => {
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
