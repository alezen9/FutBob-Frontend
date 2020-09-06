import React from 'react'
import { CircleFlag } from 'react-circle-flags'

type PropsFlags = {
  value: string
  label: string
}

const FlagOption: React.FC<PropsFlags> = React.memo(props => {
  const { value = '', label } = props
  return <div style={{ display: 'flex', alignItems: 'center' }}>
    <CircleFlag countryCode={value.toLowerCase()} height='20' style={{ marginRight: '1em' }} />
    {label}
  </div>
})

export const CountryOptions = [
  {
    value: 'AD',
    label: 'Andorra',
    component: <FlagOption value='AD' label='Andorra' />
  },
  {
    value: 'AE',
    label: 'United Arab Emirates',
    component: <FlagOption value='AE' label='United Arab Emirates' />
  },
  {
    value: 'AF',
    label: 'Afghanistan',
    component: <FlagOption value='AF' label='Afghanistan' />
  },
  {
    value: 'AG',
    label: 'Antigua and Barbuda',
    component: <FlagOption value='AG' label='Antigua and Barbuda' />
  },
  {
    value: 'AI',
    label: 'Anguilla',
    component: <FlagOption value='AI' label='Anguilla' />
  },
  {
    value: 'AL',
    label: 'Albania',
    component: <FlagOption value='AL' label='Albania' />
  },
  {
    value: 'AM',
    label: 'Armenia',
    component: <FlagOption value='AM' label='Armenia' />
  },
  {
    value: 'AN',
    label: 'Netherlands Antilles',
    component: <FlagOption value='AN' label='Netherlands Antilles' />
  },
  {
    value: 'AO',
    label: 'Angola',
    component: <FlagOption value='AO' label='Angola' />
  },
  {
    value: 'AQ',
    label: 'Antarctica',
    component: <FlagOption value='AQ' label='Antarctica' />
  },
  {
    value: 'AR',
    label: 'Argentina',
    component: <FlagOption value='AR' label='Argentina' />
  },
  {
    value: 'AS',
    label: 'American Samoa',
    component: <FlagOption value='AS' label='American Samoa' />
  },
  {
    value: 'AT',
    label: 'Austria',
    component: <FlagOption value='AT' label='Austria' />
  },
  {
    value: 'AU',
    label: 'Australia',
    component: <FlagOption value='AU' label='Australia' />
  },
  {
    value: 'AW',
    label: 'Aruba',
    component: <FlagOption value='AW' label='Aruba' />
  },
  {
    value: 'AX',
    label: 'Åland Islands',
    component: <FlagOption value='AX' label='Åland Islands' />
  },
  {
    value: 'AZ',
    label: 'Azerbaijan',
    component: <FlagOption value='AZ' label='Azerbaijan' />
  },
  {
    value: 'BA',
    label: 'Bosnia and Herzegovina',
    component: <FlagOption value='BA' label='Bosnia and Herzegovina' />
  },
  {
    value: 'BB',
    label: 'Barbados',
    component: <FlagOption value='BB' label='Barbados' />
  },
  {
    value: 'BD',
    label: 'Bangladesh',
    component: <FlagOption value='BD' label='Bangladesh' />
  },
  {
    value: 'BE',
    label: 'Belgium',
    component: <FlagOption value='BE' label='Belgium' />
  },
  {
    value: 'BF',
    label: 'Burkina Faso',
    component: <FlagOption value='BF' label='Burkina Faso' />
  },
  {
    value: 'BG',
    label: 'Bulgaria',
    component: <FlagOption value='BG' label='Bulgaria' />
  },
  {
    value: 'BH',
    label: 'Bahrain',
    component: <FlagOption value='BH' label='Bahrain' />
  },
  {
    value: 'BI',
    label: 'Burundi',
    component: <FlagOption value='BI' label='Burundi' />
  },
  {
    value: 'BJ',
    label: 'Benin',
    component: <FlagOption value='BJ' label='Benin' />
  },
  {
    value: 'BL',
    label: 'Saint Barthélemy',
    component: <FlagOption value='BL' label='Saint Barthélemy' />
  },
  {
    value: 'BM',
    label: 'Bermuda',
    component: <FlagOption value='BM' label='Bermuda' />
  },
  {
    value: 'BN',
    label: 'Brunei Darussalam',
    component: <FlagOption value='BN' label='Brunei Darussalam' />
  },
  {
    value: 'BO',
    label: 'Bolivia',
    component: <FlagOption value='BO' label='Bolivia' />
  },
  {
    value: 'BQ',
    label: 'Bonaire, Sint Eustatius and Saba',
    component: <FlagOption value='BQ' label='Bonaire, Sint Eustatius and Saba' />
  },
  {
    value: 'BR',
    label: 'Brazil',
    component: <FlagOption value='BR' label='Brazil' />
  },
  {
    value: 'BS',
    label: 'Bahamas',
    component: <FlagOption value='BS' label='Bahamas' />
  },
  {
    value: 'BT',
    label: 'Bhutan',
    component: <FlagOption value='BT' label='Bhutan' />
  },
  {
    value: 'BV',
    label: 'Bouvet Island',
    component: <FlagOption value='BV' label='Bouvet Island' />
  },
  {
    value: 'BW',
    label: 'Botswana',
    component: <FlagOption value='BW' label='Botswana' />
  },
  {
    value: 'BY',
    label: 'Belarus',
    component: <FlagOption value='BY' label='Belarus' />
  },
  {
    value: 'BZ',
    label: 'Belize',
    component: <FlagOption value='BZ' label='Belize' />
  },
  {
    value: 'CA',
    label: 'Canada',
    component: <FlagOption value='CA' label='Canada' />
  },
  {
    value: 'CC',
    label: 'Cocos (Keeling) Islands',
    component: <FlagOption value='CC' label='Cocos (Keeling) Islands' />
  },
  {
    value: 'CD',
    label: 'Congo, The Democratic Republic Of The',
    component: <FlagOption value='CD' label='Congo, The Democratic Republic Of The' />
  },
  {
    value: 'CF',
    label: 'Central African Republic',
    component: <FlagOption value='CF' label='Central African Republic' />
  },
  {
    value: 'CG',
    label: 'Congo',
    component: <FlagOption value='CG' label='Congo' />
  },
  {
    value: 'CH',
    label: 'Switzerland',
    component: <FlagOption value='CH' label='Switzerland' />
  },
  {
    value: 'CI',
    label: "Côte D'Ivoire",
    component: <FlagOption value='CI' label="Côte D'Ivoire" />
  },
  {
    value: 'CK',
    label: 'Cook Islands',
    component: <FlagOption value='CK' label='Cook Islands' />
  },
  {
    value: 'CL',
    label: 'Chile',
    component: <FlagOption value='CL' label='Chile' />
  },
  {
    value: 'CM',
    label: 'Cameroon',
    component: <FlagOption value='CM' label='Cameroon' />
  },
  {
    value: 'CN',
    label: 'China',
    component: <FlagOption value='CN' label='China' />
  },
  {
    value: 'CO',
    label: 'Colombia',
    component: <FlagOption value='CO' label='Colombia' />
  },
  {
    value: 'CR',
    label: 'Costa Rica',
    component: <FlagOption value='CR' label='Costa Rica' />
  },
  {
    value: 'CU',
    label: 'Cuba',
    component: <FlagOption value='CU' label='Cuba' />
  },
  {
    value: 'CV',
    label: 'Cape Verde',
    component: <FlagOption value='CV' label='Cape Verde' />
  },
  {
    value: 'CW',
    label: 'Curaçao',
    component: <FlagOption value='CW' label='Curaçao' />
  },
  {
    value: 'CX',
    label: 'Christmas Island',
    component: <FlagOption value='CX' label='Christmas Island' />
  },
  {
    value: 'CY',
    label: 'Cyprus',
    component: <FlagOption value='CY' label='Cyprus' />
  },
  {
    value: 'CZ',
    label: 'Czech Republic',
    component: <FlagOption value='CZ' label='Czech Republic' />
  },
  {
    value: 'DE',
    label: 'Germany',
    component: <FlagOption value='DE' label='Germany' />
  },
  {
    value: 'DJ',
    label: 'Djibouti',
    component: <FlagOption value='DJ' label='Djibouti' />
  },
  {
    value: 'DK',
    label: 'Denmark',
    component: <FlagOption value='DK' label='Denmark' />
  },
  {
    value: 'DM',
    label: 'Dominica',
    component: <FlagOption value='DM' label='Dominica' />
  },
  {
    value: 'DO',
    label: 'Dominican Republic',
    component: <FlagOption value='DO' label='Dominican Republic' />
  },
  {
    value: 'DZ',
    label: 'Algeria',
    component: <FlagOption value='DZ' label='Algeria' />
  },
  {
    value: 'EC',
    label: 'Ecuador',
    component: <FlagOption value='EC' label='Ecuador' />
  },
  {
    value: 'EE',
    label: 'Estonia',
    component: <FlagOption value='EE' label='Estonia' />
  },
  {
    value: 'EG',
    label: 'Egypt',
    component: <FlagOption value='EG' label='Egypt' />
  },
  {
    value: 'EH',
    label: 'Western Sahara',
    component: <FlagOption value='EH' label='Western Sahara' />
  },
  {
    value: 'ER',
    label: 'Eritrea',
    component: <FlagOption value='ER' label='Eritrea' />
  },
  {
    value: 'ES',
    label: 'Spain',
    component: <FlagOption value='ES' label='Spain' />
  },
  {
    value: 'ET',
    label: 'Ethiopia',
    component: <FlagOption value='ET' label='Ethiopia' />
  },
  {
    value: 'FI',
    label: 'Finland',
    component: <FlagOption value='FI' label='Finland' />
  },
  {
    value: 'FJ',
    label: 'Fiji',
    component: <FlagOption value='FJ' label='Fiji' />
  },
  {
    value: 'FK',
    label: 'Falkland Islands (Malvinas)',
    component: <FlagOption value='FK' label='Falkland Islands (Malvinas)' />
  },
  {
    value: 'FM',
    label: 'Micronesia, Federated States Of',
    component: <FlagOption value='FM' label='Micronesia, Federated States Of' />
  },
  {
    value: 'FO',
    label: 'Faroe Islands',
    component: <FlagOption value='FO' label='Faroe Islands' />
  },
  {
    value: 'FR',
    label: 'France',
    component: <FlagOption value='FR' label='France' />
  },
  {
    value: 'GA',
    label: 'Gabon',
    component: <FlagOption value='GA' label='Gabon' />
  },
  {
    value: 'GB',
    label: 'United Kingdom',
    component: <FlagOption value='GB' label='United Kingdom' />
  },
  {
    value: 'GD',
    label: 'Grenada',
    component: <FlagOption value='GD' label='Grenada' />
  },
  {
    value: 'GE',
    label: 'Georgia',
    component: <FlagOption value='GE' label='Georgia' />
  },
  {
    value: 'GF',
    label: 'French Guiana',
    component: <FlagOption value='GF' label='French Guiana' />
  },
  {
    value: 'GG',
    label: 'Guernsey',
    component: <FlagOption value='GG' label='Guernsey' />
  },
  {
    value: 'GH',
    label: 'Ghana',
    component: <FlagOption value='GH' label='Ghana' />
  },
  {
    value: 'GI',
    label: 'Gibraltar',
    component: <FlagOption value='GI' label='Gibraltar' />
  },
  {
    value: 'GL',
    label: 'Greenland',
    component: <FlagOption value='GL' label='Greenland' />
  },
  {
    value: 'GM',
    label: 'Gambia',
    component: <FlagOption value='GM' label='Gambia' />
  },
  {
    value: 'GN',
    label: 'Guinea',
    component: <FlagOption value='GN' label='Guinea' />
  },
  {
    value: 'GP',
    label: 'Guadeloupe',
    component: <FlagOption value='GP' label='Guadeloupe' />
  },
  {
    value: 'GQ',
    label: 'Equatorial Guinea',
    component: <FlagOption value='GQ' label='Equatorial Guinea' />
  },
  {
    value: 'GR',
    label: 'Greece',
    component: <FlagOption value='GR' label='Greece' />
  },
  {
    value: 'GS',
    label: 'South Georgia and the South Sandwich Islands',
    component: <FlagOption value='GS' label='South Georgia and the South Sandwich Islands' />
  },
  {
    value: 'GT',
    label: 'Guatemala',
    component: <FlagOption value='GT' label='Guatemala' />
  },
  {
    value: 'GU',
    label: 'Guam',
    component: <FlagOption value='GU' label='Guam' />
  },
  {
    value: 'GW',
    label: 'Guinea-Bissau',
    component: <FlagOption value='GW' label='Guinea-Bissau' />
  },
  {
    value: 'GY',
    label: 'Guyana',
    component: <FlagOption value='GY' label='Guyana' />
  },
  {
    value: 'HK',
    label: 'Hong Kong',
    component: <FlagOption value='HK' label='Hong Kong' />
  },
  {
    value: 'HM',
    label: 'Heard and McDonald Islands',
    component: <FlagOption value='HM' label='Heard and McDonald Islands' />
  },
  {
    value: 'HN',
    label: 'Honduras',
    component: <FlagOption value='HN' label='Honduras' />
  },
  {
    value: 'HR',
    label: 'Croatia',
    component: <FlagOption value='HR' label='Croatia' />
  },
  {
    value: 'HT',
    label: 'Haiti',
    component: <FlagOption value='HT' label='Haiti' />
  },
  {
    value: 'HU',
    label: 'Hungary',
    component: <FlagOption value='HU' label='Hungary' />
  },
  {
    value: 'ID',
    label: 'Indonesia',
    component: <FlagOption value='ID' label='Indonesia' />
  },
  {
    value: 'IE',
    label: 'Ireland',
    component: <FlagOption value='IE' label='Ireland' />
  },
  {
    value: 'IL',
    label: 'Israel',
    component: <FlagOption value='IL' label='Israel' />
  },
  {
    value: 'IM',
    label: 'Isle of Man',
    component: <FlagOption value='IM' label='Isle of Man' />
  },
  {
    value: 'IN',
    label: 'India',
    component: <FlagOption value='IN' label='India' />
  },
  {
    value: 'IO',
    label: 'British Indian Ocean Territory',
    component: <FlagOption value='IO' label='British Indian Ocean Territory' />
  },
  {
    value: 'IQ',
    label: 'Iraq',
    component: <FlagOption value='IQ' label='Iraq' />
  },
  {
    value: 'IR',
    label: 'Iran, Islamic Republic Of',
    component: <FlagOption value='IR' label='Iran, Islamic Republic Of' />
  },
  {
    value: 'IS',
    label: 'Iceland',
    component: <FlagOption value='IS' label='Iceland' />
  },
  {
    value: 'IT',
    label: 'Italy',
    component: <FlagOption value='IT' label='Italy' />
  },
  {
    value: 'JE',
    label: 'Jersey',
    component: <FlagOption value='JE' label='Jersey' />
  },
  {
    value: 'JM',
    label: 'Jamaica',
    component: <FlagOption value='JM' label='Jamaica' />
  },
  {
    value: 'JO',
    label: 'Jordan',
    component: <FlagOption value='JO' label='Jordan' />
  },
  {
    value: 'JP',
    label: 'Japan',
    component: <FlagOption value='JP' label='Japan' />
  },
  {
    value: 'KE',
    label: 'Kenya',
    component: <FlagOption value='KE' label='Kenya' />
  },
  {
    value: 'KG',
    label: 'Kyrgyzstan',
    component: <FlagOption value='KG' label='Kyrgyzstan' />
  },
  {
    value: 'KH',
    label: 'Cambodia',
    component: <FlagOption value='KH' label='Cambodia' />
  },
  {
    value: 'KI',
    label: 'Kiribati',
    component: <FlagOption value='KI' label='Kiribati' />
  },
  {
    value: 'KM',
    label: 'Comoros',
    component: <FlagOption value='KM' label='Comoros' />
  },
  {
    value: 'KN',
    label: 'Saint Kitts And Nevis',
    component: <FlagOption value='KN' label='Saint Kitts And Nevis' />
  },
  {
    value: 'KP',
    label: "Korea, Democratic People's Republic Of",
    component: <FlagOption value='KP' label="Korea, Democratic People's Republic Of" />
  },
  {
    value: 'KR',
    label: 'Korea, Republic of',
    component: <FlagOption value='KR' label='Korea, Republic of' />
  },
  {
    value: 'KW',
    label: 'Kuwait',
    component: <FlagOption value='KW' label='Kuwait' />
  },
  {
    value: 'KY',
    label: 'Cayman Islands',
    component: <FlagOption value='KY' label='Cayman Islands' />
  },
  {
    value: 'KZ',
    label: 'Kazakhstan',
    component: <FlagOption value='KZ' label='Kazakhstan' />
  },
  {
    value: 'LA',
    label: "Lao People's Democratic Republic",
    component: <FlagOption value='LA' label="Lao People's Democratic Republic" />
  },
  {
    value: 'LB',
    label: 'Lebanon',
    component: <FlagOption value='LB' label='Lebanon' />
  },
  {
    value: 'LC',
    label: 'Saint Lucia',
    component: <FlagOption value='LC' label='Saint Lucia' />
  },
  {
    value: 'LI',
    label: 'Liechtenstein',
    component: <FlagOption value='LI' label='Liechtenstein' />
  },
  {
    value: 'LK',
    label: 'Sri Lanka',
    component: <FlagOption value='LK' label='Sri Lanka' />
  },
  {
    value: 'LR',
    label: 'Liberia',
    component: <FlagOption value='LR' label='Liberia' />
  },
  {
    value: 'LS',
    label: 'Lesotho',
    component: <FlagOption value='LS' label='Lesotho' />
  },
  {
    value: 'LT',
    label: 'Lithuania',
    component: <FlagOption value='LT' label='Lithuania' />
  },
  {
    value: 'LU',
    label: 'Luxembourg',
    component: <FlagOption value='LU' label='Luxembourg' />
  },
  {
    value: 'LV',
    label: 'Latvia',
    component: <FlagOption value='LV' label='Latvia' />
  },
  {
    value: 'LY',
    label: 'Libya',
    component: <FlagOption value='LY' label='Libya' />
  },
  {
    value: 'MA',
    label: 'Morocco',
    component: <FlagOption value='MA' label='Morocco' />
  },
  {
    value: 'MC',
    label: 'Monaco',
    component: <FlagOption value='MC' label='Monaco' />
  },
  {
    value: 'MD',
    label: 'Moldova, Republic of',
    component: <FlagOption value='MD' label='Moldova, Republic of' />
  },
  {
    value: 'ME',
    label: 'Montenegro',
    component: <FlagOption value='ME' label='Montenegro' />
  },
  {
    value: 'MF',
    label: 'Saint Martin',
    component: <FlagOption value='MF' label='Saint Martin' />
  },
  {
    value: 'MG',
    label: 'Madagascar',
    component: <FlagOption value='MG' label='Madagascar' />
  },
  {
    value: 'MH',
    label: 'Marshall Islands',
    component: <FlagOption value='MH' label='Marshall Islands' />
  },
  {
    value: 'MK',
    label: 'North Macedonia, Republic Of',
    component: <FlagOption value='MK' label='North Macedonia, Republic Of' />
  },
  {
    value: 'ML',
    label: 'Mali',
    component: <FlagOption value='ML' label='Mali' />
  },
  {
    value: 'MM',
    label: 'Myanmar',
    component: <FlagOption value='MM' label='Myanmar' />
  },
  {
    value: 'MN',
    label: 'Mongolia',
    component: <FlagOption value='MN' label='Mongolia' />
  },
  {
    value: 'MO',
    label: 'Macao',
    component: <FlagOption value='MO' label='Macao' />
  },
  {
    value: 'MP',
    label: 'Northern Mariana Islands',
    component: <FlagOption value='MP' label='Northern Mariana Islands' />
  },
  {
    value: 'MQ',
    label: 'Martinique',
    component: <FlagOption value='MQ' label='Martinique' />
  },
  {
    value: 'MR',
    label: 'Mauritania',
    component: <FlagOption value='MR' label='Mauritania' />
  },
  {
    value: 'MS',
    label: 'Montserrat',
    component: <FlagOption value='MS' label='Montserrat' />
  },
  {
    value: 'MT',
    label: 'Malta',
    component: <FlagOption value='MT' label='Malta' />
  },
  {
    value: 'MU',
    label: 'Mauritius',
    component: <FlagOption value='MU' label='Mauritius' />
  },
  {
    value: 'MV',
    label: 'Maldives',
    component: <FlagOption value='MV' label='Maldives' />
  },
  {
    value: 'MW',
    label: 'Malawi',
    component: <FlagOption value='MW' label='Malawi' />
  },
  {
    value: 'MX',
    label: 'Mexico',
    component: <FlagOption value='MX' label='Mexico' />
  },
  {
    value: 'MY',
    label: 'Malaysia',
    component: <FlagOption value='MY' label='Malaysia' />
  },
  {
    value: 'MZ',
    label: 'Mozambique',
    component: <FlagOption value='MZ' label='Mozambique' />
  },
  {
    value: 'NA',
    label: 'Namibia',
    component: <FlagOption value='NA' label='Namibia' />
  },
  {
    value: 'NC',
    label: 'New Caledonia',
    component: <FlagOption value='NC' label='New Caledonia' />
  },
  {
    value: 'NE',
    label: 'Niger',
    component: <FlagOption value='NE' label='Niger' />
  },
  {
    value: 'NF',
    label: 'Norfolk Island',
    component: <FlagOption value='NF' label='Norfolk Island' />
  },
  {
    value: 'NG',
    label: 'Nigeria',
    component: <FlagOption value='NG' label='Nigeria' />
  },
  {
    value: 'NI',
    label: 'Nicaragua',
    component: <FlagOption value='NI' label='Nicaragua' />
  },
  {
    value: 'NL',
    label: 'Netherlands',
    component: <FlagOption value='NL' label='Netherlands' />
  },
  {
    value: 'NO',
    label: 'Norway',
    component: <FlagOption value='NO' label='Norway' />
  },
  {
    value: 'NP',
    label: 'Nepal',
    component: <FlagOption value='NP' label='Nepal' />
  },
  {
    value: 'NR',
    label: 'Nauru',
    component: <FlagOption value='NR' label='Nauru' />
  },
  {
    value: 'NU',
    label: 'Niue',
    component: <FlagOption value='NU' label='Niue' />
  },
  {
    value: 'NZ',
    label: 'New Zealand',
    component: <FlagOption value='NZ' label='New Zealand' />
  },
  {
    value: 'OM',
    label: 'Oman',
    component: <FlagOption value='OM' label='Oman' />
  },
  {
    value: 'PA',
    label: 'Panama',
    component: <FlagOption value='PA' label='Panama' />
  },
  {
    value: 'PE',
    label: 'Peru',
    component: <FlagOption value='PE' label='Peru' />
  },
  {
    value: 'PF',
    label: 'French Polynesia',
    component: <FlagOption value='PF' label='French Polynesia' />
  },
  {
    value: 'PG',
    label: 'Papua New Guinea',
    component: <FlagOption value='PG' label='Papua New Guinea' />
  },
  {
    value: 'PH',
    label: 'Philippines',
    component: <FlagOption value='PH' label='Philippines' />
  },
  {
    value: 'PK',
    label: 'Pakistan',
    component: <FlagOption value='PK' label='Pakistan' />
  },
  {
    value: 'PL',
    label: 'Poland',
    component: <FlagOption value='PL' label='Poland' />
  },
  {
    value: 'PM',
    label: 'Saint Pierre And Miquelon',
    component: <FlagOption value='PM' label='Saint Pierre And Miquelon' />
  },
  {
    value: 'PN',
    label: 'Pitcairn',
    component: <FlagOption value='PN' label='Pitcairn' />
  },
  {
    value: 'PR',
    label: 'Puerto Rico',
    component: <FlagOption value='PR' label='Puerto Rico' />
  },
  {
    value: 'PS',
    label: 'Palestine, State of',
    component: <FlagOption value='PS' label='Palestine, State of' />
  },
  {
    value: 'PT',
    label: 'Portugal',
    component: <FlagOption value='PT' label='Portugal' />
  },
  {
    value: 'PW',
    label: 'Palau',
    component: <FlagOption value='PW' label='Palau' />
  },
  {
    value: 'PY',
    label: 'Paraguay',
    component: <FlagOption value='PY' label='Paraguay' />
  },
  {
    value: 'QA',
    label: 'Qatar',
    component: <FlagOption value='QA' label='Qatar' />
  },
  {
    value: 'RE',
    label: 'Réunion',
    component: <FlagOption value='RE' label='Réunion' />
  },
  {
    value: 'RO',
    label: 'Romania',
    component: <FlagOption value='RO' label='Romania' />
  },
  {
    value: 'RS',
    label: 'Serbia',
    component: <FlagOption value='RS' label='Serbia' />
  },
  {
    value: 'RU',
    label: 'Russian Federation',
    component: <FlagOption value='RU' label='Russian Federation' />
  },
  {
    value: 'RW',
    label: 'Rwanda',
    component: <FlagOption value='RW' label='Rwanda' />
  },
  {
    value: 'SA',
    label: 'Saudi Arabia',
    component: <FlagOption value='SA' label='Saudi Arabia' />
  },
  {
    value: 'SB',
    label: 'Solomon Islands',
    component: <FlagOption value='SB' label='Solomon Islands' />
  },
  {
    value: 'SC',
    label: 'Seychelles',
    component: <FlagOption value='SC' label='Seychelles' />
  },
  {
    value: 'SD',
    label: 'Sudan',
    component: <FlagOption value='SD' label='Sudan' />
  },
  {
    value: 'SE',
    label: 'Sweden',
    component: <FlagOption value='SE' label='Sweden' />
  },
  {
    value: 'SG',
    label: 'Singapore',
    component: <FlagOption value='SG' label='Singapore' />
  },
  {
    value: 'SH',
    label: 'Saint Helena',
    component: <FlagOption value='SH' label='Saint Helena' />
  },
  {
    value: 'SI',
    label: 'Slovenia',
    component: <FlagOption value='SI' label='Slovenia' />
  },
  {
    value: 'SJ',
    label: 'Svalbard And Jan Mayen',
    component: <FlagOption value='SJ' label='Svalbard And Jan Mayen' />
  },
  {
    value: 'SK',
    label: 'Slovakia',
    component: <FlagOption value='SK' label='Slovakia' />
  },
  {
    value: 'SL',
    label: 'Sierra Leone',
    component: <FlagOption value='SL' label='Sierra Leone' />
  },
  {
    value: 'SM',
    label: 'San Marino',
    component: <FlagOption value='SM' label='San Marino' />
  },
  {
    value: 'SN',
    label: 'Senegal',
    component: <FlagOption value='SN' label='Senegal' />
  },
  {
    value: 'SO',
    label: 'Somalia',
    component: <FlagOption value='SO' label='Somalia' />
  },
  {
    value: 'SR',
    label: 'Suriname',
    component: <FlagOption value='SR' label='Suriname' />
  },
  {
    value: 'SS',
    label: 'South Sudan',
    component: <FlagOption value='SS' label='South Sudan' />
  },
  {
    value: 'ST',
    label: 'Sao Tome and Principe',
    component: <FlagOption value='ST' label='Sao Tome and Principe' />
  },
  {
    value: 'SV',
    label: 'El Salvador',
    component: <FlagOption value='SV' label='El Salvador' />
  },
  {
    value: 'SX',
    label: 'Sint Maarten',
    component: <FlagOption value='SX' label='Sint Maarten' />
  },
  {
    value: 'SY',
    label: 'Syrian Arab Republic',
    component: <FlagOption value='SY' label='Syrian Arab Republic' />
  },
  {
    value: 'SZ',
    label: 'Swaziland',
    component: <FlagOption value='SZ' label='Swaziland' />
  },
  {
    value: 'TC',
    label: 'Turks and Caicos Islands',
    component: <FlagOption value='TC' label='Turks and Caicos Islands' />
  },
  {
    value: 'TD',
    label: 'Chad',
    component: <FlagOption value='TD' label='Chad' />
  },
  {
    value: 'TF',
    label: 'French Southern Territories',
    component: <FlagOption value='TF' label='French Southern Territories' />
  },
  {
    value: 'TG',
    label: 'Togo',
    component: <FlagOption value='TG' label='Togo' />
  },
  {
    value: 'TH',
    label: 'Thailand',
    component: <FlagOption value='TH' label='Thailand' />
  },
  {
    value: 'TJ',
    label: 'Tajikistan',
    component: <FlagOption value='TJ' label='Tajikistan' />
  },
  {
    value: 'TK',
    label: 'Tokelau',
    component: <FlagOption value='TK' label='Tokelau' />
  },
  {
    value: 'TL',
    label: 'Timor-Leste',
    component: <FlagOption value='TL' label='Timor-Leste' />
  },
  {
    value: 'TM',
    label: 'Turkmenistan',
    component: <FlagOption value='TM' label='Turkmenistan' />
  },
  {
    value: 'TN',
    label: 'Tunisia',
    component: <FlagOption value='TN' label='Tunisia' />
  },
  {
    value: 'TO',
    label: 'Tonga',
    component: <FlagOption value='TO' label='Tonga' />
  },
  {
    value: 'TR',
    label: 'Turkey',
    component: <FlagOption value='TR' label='Turkey' />
  },
  {
    value: 'TT',
    label: 'Trinidad and Tobago',
    component: <FlagOption value='TT' label='Trinidad and Tobago' />
  },
  {
    value: 'TV',
    label: 'Tuvalu',
    component: <FlagOption value='TV' label='Tuvalu' />
  },
  {
    value: 'TW',
    label: 'Taiwan, Republic Of China',
    component: <FlagOption value='TW' label='Taiwan, Republic Of China' />
  },
  {
    value: 'TZ',
    label: 'Tanzania, United Republic of',
    component: <FlagOption value='TZ' label='Tanzania, United Republic of' />
  },
  {
    value: 'UA',
    label: 'Ukraine',
    component: <FlagOption value='UA' label='Ukraine' />
  },
  {
    value: 'UG',
    label: 'Uganda',
    component: <FlagOption value='UG' label='Uganda' />
  },
  {
    value: 'UM',
    label: 'United States Minor Outlying Islands',
    component: <FlagOption value='UM' label='United States Minor Outlying Islands' />
  },
  {
    value: 'US',
    label: 'United States',
    component: <FlagOption value='US' label='United States' />
  },
  {
    value: 'UY',
    label: 'Uruguay',
    component: <FlagOption value='UY' label='Uruguay' />
  },
  {
    value: 'UZ',
    label: 'Uzbekistan',
    component: <FlagOption value='UZ' label='Uzbekistan' />
  },
  {
    value: 'VA',
    label: 'Holy See (Vatican City State)',
    component: <FlagOption value='VA' label='Holy See (Vatican City State)' />
  },
  {
    value: 'VC',
    label: 'Saint Vincent And The Grenadines',
    component: <FlagOption value='VC' label='Saint Vincent And The Grenadines' />
  },
  {
    value: 'VE',
    label: 'Venezuela, Bolivarian Republic of',
    component: <FlagOption value='VE' label='Venezuela, Bolivarian Republic of' />
  },
  {
    value: 'VG',
    label: 'Virgin Islands, British',
    component: <FlagOption value='VG' label='Virgin Islands, British' />
  },
  {
    value: 'VI',
    label: 'Virgin Islands, U.S.',
    component: <FlagOption value='VI' label='Virgin Islands, U.S.' />
  },
  {
    value: 'VN',
    label: 'Vietnam',
    component: <FlagOption value='VN' label='Vietnam' />
  },
  {
    value: 'VU',
    label: 'Vanuatu',
    component: <FlagOption value='VU' label='Vanuatu' />
  },
  {
    value: 'WF',
    label: 'Wallis and Futuna',
    component: <FlagOption value='WF' label='Wallis and Futuna' />
  },
  {
    value: 'WS',
    label: 'Samoa',
    component: <FlagOption value='WS' label='Samoa' />
  },
  {
    value: 'YE',
    label: 'Yemen',
    component: <FlagOption value='YE' label='Yemen' />
  },
  {
    value: 'YT',
    label: 'Mayotte',
    component: <FlagOption value='YT' label='Mayotte' />
  },
  {
    value: 'ZA',
    label: 'South Africa',
    component: <FlagOption value='ZA' label='South Africa' />
  },
  {
    value: 'ZM',
    label: 'Zambia',
    component: <FlagOption value='ZM' label='Zambia' />
  },
  {
    value: 'ZW',
    label: 'Zimbabwe',
    component: <FlagOption value='ZW' label='Zimbabwe' />
  }
]

export const getFlagUrl = (code, size) => `https://www.countryflags.io/${code.toLowerCase()}/flat/${size || 32}.png`
