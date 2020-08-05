import React from 'react'
import SvgIcon from '@material-ui/core/SvgIcon'
import WorkRoundedIcon from '@material-ui/icons/WorkRounded'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  condexoServiceIconClass: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  condexoLogoInsideIcon: {
    position: 'absolute',
    color: theme.type === 'dark'
      ? '#222'
      : '#fafafa',
    transform: 'scale(.55) translateY(.1em)'
  },
  cLetterInsideIcon: {
    position: 'absolute',
    color: theme.type === 'dark'
      ? '#222'
      : '#fafafa',
    fontSize: '.6em',
    fontWeight: 'bold',
    transform: 'translateY(.2em)'
  }
}))

export const CondexoLogo = props => {
  return (
    <SvgIcon {...props} viewBox='0 0 123 157.6'>
      <path d='M46.5,18.6H36.3V28h-4.7v67.7c0,9.6-2.6,18.6-7.2,26.3c-5.2-7.5-8.3-16.5-8.3-26.3c0-11.2,4-21.4,10.6-29.3
                  V44.8C10.6,56,0,74.6,0,95.8c0,14.8,5.2,28.4,13.8,39c0,0,0,0,0,0c3.1,3.9,6.7,7.4,10.7,10.4c13.5-12.2,22-29.8,22-49.4V18.6z
                  M42.1,100.4h-4.8v-4.8h4.8V100.4z M42.1,90.5h-4.8v-4.8h4.8V90.5z M42.1,80.5h-4.8v-4.8h4.8V80.5z M42.1,70.6h-4.8v-4.8h4.8V70.6z
                  M42.1,60.6h-4.8v-4.8h4.8V60.6z M42.1,50.7h-4.8v-4.8h4.8V50.7z M42.1,40.7h-4.8v-4.8h4.8V40.7z' />
      <path d='M72.3,95.8V11.1l-5.8-2.4V2.4L61.9,0l-4.6,2.4v6.4l-5.8,2.4v84.7c0,20.5-8.6,39.4-22.3,52.6
                  c0.2,0.1,0.4,0.2,0.5,0.4c9.4,5.8,20.5,9.1,32.3,9.1c12.1,0,23.4-3.5,32.9-9.4C81,135.2,72.3,116.5,72.3,95.8z M60,100.4h-4.8v-4.8
                  H60V100.4z M60,90.5h-4.8v-4.8H60V90.5z M60,80.5h-4.8v-4.8H60V80.5z M60,70.6h-4.8v-4.8H60V70.6z M60,60.6h-4.8v-4.8H60V60.6z
                  M60,50.7h-4.8v-4.8H60V50.7z M60,40.7h-4.8v-4.8H60V40.7z M60,30.8h-4.8V26H60V30.8z M60,20.8h-4.8V16H60V20.8z M69.2,100.4h-4.8
                  v-4.8h4.8V100.4z M69.2,90.5h-4.8v-4.8h4.8V90.5z M69.2,80.5h-4.8v-4.8h4.8V80.5z M69.2,70.6h-4.8v-4.8h4.8V70.6z M69.2,60.6h-4.8
                  v-4.8h4.8V60.6z M69.2,50.7h-4.8v-4.8h4.8V50.7z M69.2,40.7h-4.8v-4.8h4.8V40.7z M69.2,30.8h-4.8V26h4.8V30.8z M69.2,20.8h-4.8V16
                  h4.8V20.8z' />
      <path id='XMLID_9_' d='M123,84.2c-3.1-16.3-12.5-30.3-25.6-39.4v21.7c4.2,5.1,7.3,11.1,9,17.7H123z' />
      <path d='M123,107.3h-16.5c-1.4,5.4-3.7,10.4-6.8,14.8c-4.6-7.7-7.2-16.7-7.2-26.3V61.3c0,0,0,0,0.1,0.1V41.7
                  c0,0,0,0-0.1,0V27.4l-7.8-4.1v-4.8h-7v77.1c0,19.6,8.5,37.2,22,49.4c3.7-2.8,7.1-6,10-9.6c0,0,0.1-0.1,0.1-0.1
                  c0.2-0.2,0.4-0.5,0.6-0.7c0,0,0,0,0,0C116.6,127,121.1,117.6,123,107.3z M87,100.4h-4.8v-4.8H87V100.4z M87,90.5h-4.8v-4.8H87V90.5
                  z M87,80.5h-4.8v-4.8H87V80.5z M87,70.6h-4.8v-4.8H87V70.6z M87,60.6h-4.8v-4.8H87V60.6z M87,50.7h-4.8v-4.8H87V50.7z M87,40.7
                  h-4.8v-4.8H87V40.7z' />
    </SvgIcon>
  )
}

export const CsvIcon = props => {
  return (
    <SvgIcon {...props} viewBox='0 0 548.29 548.291'>
      <g>
        <path d='M486.2,196.121h-13.164V132.59c0-0.399-0.064-0.795-0.116-1.2c-0.021-2.52-0.824-5-2.551-6.96L364.656,3.677c-0.031-0.034-0.064-0.044-0.085-0.075c-0.629-0.707-1.364-1.292-2.141-1.796c-0.231-0.157-0.462-0.286-0.704-0.419c-0.672-0.365-1.386-0.672-2.121-0.893c-0.199-0.052-0.377-0.134-0.576-0.188C358.229,0.118,357.4,0,356.562,0H96.757C84.893,0,75.256,9.649,75.256,21.502v174.613H62.093c-16.972,0-30.733,13.756-30.733,30.73v159.81c0,16.966,13.761,30.736,30.733,30.736h13.163V526.79c0,11.854,9.637,21.501,21.501,21.501h354.777c11.853,0,21.502-9.647,21.502-21.501V417.392H486.2c16.966,0,30.729-13.764,30.729-30.731v-159.81C516.93,209.872,503.166,196.121,486.2,196.121z M96.757,21.502h249.053v110.006c0,5.94,4.818,10.751,10.751,10.751h94.973v53.861H96.757V21.502z M258.618,313.18c-26.68-9.291-44.063-24.053-44.063-47.389c0-27.404,22.861-48.368,60.733-48.368c18.107,0,31.447,3.811,40.968,8.107l-8.09,29.3c-6.43-3.107-17.862-7.632-33.59-7.632c-15.717,0-23.339,7.149-23.339,15.485c0,10.247,9.047,14.769,29.78,22.632c28.341,10.479,41.681,25.239,41.681,47.874c0,26.909-20.721,49.786-64.792,49.786c-18.338,0-36.449-4.776-45.497-9.77l7.38-30.016c9.772,5.014,24.775,10.006,40.264,10.006c16.671,0,25.488-6.908,25.488-17.396C285.536,325.789,277.909,320.078,258.618,313.18z M69.474,302.692c0-54.781,39.074-85.269,87.654-85.269c18.822,0,33.113,3.811,39.549,7.149l-7.392,28.816c-7.38-3.084-17.632-5.939-30.491-5.939c-28.822,0-51.206,17.375-51.206,53.099c0,32.158,19.051,52.4,51.456,52.4c10.947,0,23.097-2.378,30.241-5.238l5.483,28.346c-6.672,3.34-21.674,6.919-41.208,6.919C98.06,382.976,69.474,348.424,69.474,302.692z M451.534,520.962H96.757v-103.57h354.777V520.962z M427.518,380.583h-42.399l-51.45-160.536h39.787l19.526,67.894c5.479,19.046,10.479,37.386,14.299,57.397h0.709c4.048-19.298,9.045-38.352,14.526-56.693l20.487-68.598h38.599L427.518,380.583z' />
      </g>
    </SvgIcon>
  )
}

export const CSVIconColored = props => {
  return (
    <SvgIcon {...props} viewBox='0 0 303.188 303.188'>
      <g>
        <polygon fill='#E4E4E4' points='219.821,0 32.842,0 32.842,303.188 270.346,303.188 270.346,50.525' />
        <polygon fill='#007934' points='227.64,25.263 32.842,25.263 32.842,0 219.821,0' />
        <g>
          <g>
            <path fill='#A4A9AD' d='M114.872,227.984c-2.982,0-5.311,1.223-6.982,3.666c-1.671,2.444-2.507,5.814-2.507,10.109c0,8.929,3.396,13.393,10.188,13.393c2.052,0,4.041-0.285,5.967-0.856c1.925-0.571,3.86-1.259,5.808-2.063v10.601c-3.872,1.713-8.252,2.57-13.14,2.57c-7.004,0-12.373-2.031-16.107-6.094c-3.734-4.062-5.602-9.934-5.602-17.615c0-4.803,0.904-9.023,2.714-12.663c1.809-3.64,4.411-6.438,7.808-8.395c3.396-1.957,7.39-2.937,11.98-2.937c5.016,0,9.808,1.09,14.378,3.27l-3.841,9.871c-1.713-0.805-3.428-1.481-5.141-2.031C118.681,228.26,116.841,227.984,114.872,227.984z' />
            <path fill='#A4A9AD' d='M166.732,250.678c0,2.878-0.729,5.433-2.191,7.665c-1.459,2.232-3.565,3.967-6.315,5.205c-2.751,1.237-5.977,1.856-9.681,1.856c-3.089,0-5.681-0.217-7.775-0.65c-2.095-0.434-4.274-1.191-6.538-2.27v-11.172c2.391,1.227,4.877,2.186,7.458,2.872c2.582,0.689,4.951,1.032,7.109,1.032c1.862,0,3.227-0.322,4.095-0.969c0.867-0.645,1.302-1.476,1.302-2.491c0-0.635-0.175-1.19-0.524-1.666c-0.349-0.477-0.91-0.958-1.682-1.444c-0.772-0.486-2.83-1.48-6.173-2.983c-3.026-1.375-5.296-2.708-6.809-3.999s-2.634-2.771-3.364-4.443s-1.095-3.65-1.095-5.936c0-4.273,1.555-7.605,4.666-9.997c3.109-2.391,7.384-3.587,12.822-3.587c4.803,0,9.7,1.111,14.694,3.333l-3.841,9.681c-4.337-1.989-8.082-2.984-11.234-2.984c-1.63,0-2.814,0.286-3.555,0.857s-1.111,1.28-1.111,2.127c0,0.91,0.471,1.725,1.412,2.443c0.941,0.72,3.496,2.031,7.665,3.936c3.999,1.799,6.776,3.729,8.331,5.792C165.955,244.949,166.732,247.547,166.732,250.678z' />
            <path fill='#A4A9AD' d='M199.964,218.368h14.027l-15.202,46.401H184.03l-15.139-46.401h14.092l6.316,23.519c1.312,5.227,2.031,8.865,2.158,10.918c0.148-1.481,0.443-3.333,0.889-5.555c0.443-2.222,0.835-3.967,1.174-5.236L199.964,218.368z' />
          </g>
        </g>
        <polygon fill='#D1D3D3' points='219.821,50.525 270.346,50.525 219.821,0' />
        <g>
          <rect x='134.957' y='80.344' fill='#007934' width='33.274' height='15.418' />
          <rect x='175.602' y='80.344' fill='#007934' width='33.273' height='15.418' />
          <rect x='134.957' y='102.661' fill='#007934' width='33.274' height='15.419' />
          <rect x='175.602' y='102.661' fill='#007934' width='33.273' height='15.419' />
          <rect x='134.957' y='124.979' fill='#007934' width='33.274' height='15.418' />
          <rect x='175.602' y='124.979' fill='#007934' width='33.273' height='15.418' />
          <rect x='94.312' y='124.979' fill='#007934' width='33.273' height='15.418' />
          <rect x='134.957' y='147.298' fill='#007934' width='33.274' height='15.418' />
          <rect x='175.602' y='147.298' fill='#007934' width='33.273' height='15.418' />
          <rect x='94.312' y='147.298' fill='#007934' width='33.273' height='15.418' />
          <g>
            <path fill='#007934' d='M127.088,116.162h-10.04l-6.262-10.041l-6.196,10.041h-9.821l10.656-16.435L95.406,84.04h9.624l5.8,9.932l5.581-9.932h9.909l-10.173,16.369L127.088,116.162z' />
          </g>
        </g>
      </g>
    </SvgIcon>
  )
}

export const CondexoServiceIcon = React.memo(props => {
  const classes = useStyles()
  return (
    <div className={classes.condexoServiceIconClass}>
      <WorkRoundedIcon {...props} />
      {/* <CondexoLogo className={classes.condexoLogoInsideIcon} /> */}
      <span className={classes.cLetterInsideIcon}>CX</span>
    </div>
  )
})
