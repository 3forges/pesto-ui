import { useState } from "preact/hooks"

import {
  PestoContentTypeApiEntity,
} from "../app/api/entities/PestoContentTypeApiEntity"/* from "../../features/PestoApi/ContentTypes/pestoContentTypeSlice"*/

import { Dropdown, Spinner, TextInput, Alert, Toast } from "flowbite-react"
// import { HiCheck, HiExclamation, HiX } from 'react-icons/hi';
/// import { HiCheck, HiExclamation, HiX } from 'flowbite-react';
// import { Highlighter, HandIcon, EyeOffIcon, EyeIcon, HopIcon, BellIcon } from 'lucide-preact'
import { BellIcon } from 'lucide-preact'

import { ContentTypeListCard2 } from "./../components/ContentType/ContentTypeListCard2"
import { pestoApi } from "../app/api/endpoints/"
import { PestoContentTypeContextProvider } from "../components/ContentType/ContentTypeContext"
const { useContentTypeListQuery } = pestoApi

interface Filter {
  target: number
  value: string
  filterfunction: Function
}

/**
 * PROJECT MAIN COMPONENT
 *
 * LIST PROJECT / CREATE PROJECT
 *
 *  PROVIDE CREATE PROJECT FORM
 *
 *  PROVIDE LIST WITH OPTIONAL BUTTONS (EDIT|REMOVE)
 * @returns PROJECT USER INTERFACE MANAGEMENT
 */
export function PestoContentTypeList(): JSX.Element {
  
  const { data: pestoContentTypeListData = [], isLoading, isError, isUninitialized, isSuccess } = useContentTypeListQuery()

  if (isLoading || isUninitialized) {
    return (<div>
      <Alert className={`m-5`}><Spinner aria-label="Loading..." className={`rounded bg-cyan-300 text-yellow-300 p-1 ml-2 mr-2`} />Loading <code>Pesto Content Types</code> ...</Alert>
    </div>
    )

  }
  if (isError) {
    return (<div>
      <Alert>Something went wrong while trying to fetch Pesto Content Types !</Alert>
    </div>)
  }

  /* ----------------------- JSX ----------------------- */
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
          <div className="ml-3 text-sm font-normal">Pesto ContentType Items loaded successfully.</div>
          <Toast.Toggle />
        </Toast>
        
      ): (
        <></>
      )
    }
    <div>

      <hr style="margin:10px" />

      {/* ----------------------PAGINATION------------------- */}


      {/* ----------------------CONTENT TYPES LIST------------------- */}
      <div className="content-types">
        {pestoContentTypeListData &&
          pestoContentTypeListData[0] &&
          pestoContentTypeListData[0]._id !== 0 &&
          pestoContentTypeListData.map((contentType: PestoContentTypeApiEntity, index: number) => {
            console.log(`Inside PestoContentTypeList.tsx - pestoContentTypeListData.map( - contentType: [${contentType.name}]`)
            return (
              <PestoContentTypeContextProvider contentTypeApiEntity={contentType}>
              <div>
                <span>ContentType # {index}</span>
                <ContentTypeListCard2
                  isEditModeOn={false}
                />
              </div>
              </PestoContentTypeContextProvider>
            )
          }
          )}
      </div>
    </div>
    
    </>
  )
}
