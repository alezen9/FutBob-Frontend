import React from 'react'
import { FormikEssentials } from '@_components/FormikInput'
import Image from 'next/image'

type Props = {
   formik: FormikEssentials
}

const _Final_Save: React.FC<Props> = props => {
   const { formik } = props
   console.log(formik.values)
  return (
    <div>
         <Image
        src="/images/shield.png"
        alt="Picture of the author"
         layout='responsive'
      />
    </div>
  )
}

export default React.memo(_Final_Save)
