import AgencyDetails from '@/components/forms/agency-details'
import { getAuthUserDetails, verifyAndAcceptInvitation } from '@/lib/queries'
import { currentUser } from '@clerk/nextjs'
import { Plan } from '@prisma/client'

import { redirect } from 'next/navigation'
import React from 'react'

const Page = async ({
    searchParams,
  }: {
    searchParams: { plan: Plan; state: string; code: string }
  }) => {
  const user = await getAuthUserDetails()

  const authUser = await currentUser()
  //console.log(user)
  const agencyID = await verifyAndAcceptInvitation()
  //console.log(agencyID)
  //If agency exist 
  if (agencyID){
    // Checking for the role of user If user is subaccount guest or user then redirect them to subaccunt routegroup
    //user is optional parameter
    if (user?.role === 'SUBACCOUNT_GUEST' || user?.role === 'SUBACCOUNT_USER'){
        return redirect('/subaccount')
    }
    //If user is agency admin or owner then check for the related conditions
    else if (user?.role === 'AGENCY_ADMIN' || user?.role === 'AGENCY_OWNER')
    {
        //Checking weather there is a plan in their search parameter if there is a plan then redirect the mto billing plan
        if (searchParams.plan) {
            return redirect(`/agency/${agencyID}/billing?plan=${searchParams.plan}`)
          }
          if (searchParams.state) {
            const statePath = searchParams.state.split('___')[0]
            const stateAgencyId = searchParams.state.split('___')[1]
            if (!stateAgencyId) return <div>Not authorized</div>
            return redirect(
              `/agency/${stateAgencyId}/${statePath}?code=${searchParams.code}`
            )
          } else return redirect(`/agency/${agencyID}`)
        } else {
          return <div>Not authorized</div>
        }
    }
  
  return (
    <div className="flex justify-center items-center mt-4">
      <div className="max-w-[850px] border-[1px] p-4 rounded-xl">
        <h1 className="text-4xl"> Create An Agency</h1>
            
        <AgencyDetails
        //passsing data to the props of agtencydetail form
        data={{ companyEmail: authUser?.emailAddresses[0].emailAddress }}
        />
      </div>
    </div>
  )
}

export default Page