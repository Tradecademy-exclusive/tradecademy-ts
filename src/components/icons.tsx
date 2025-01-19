import { BsJournalText } from 'react-icons/bs'
import { MdOutlineLocalOffer } from 'react-icons/md'
import { LuLayoutGrid } from 'react-icons/lu'

export const Icons = {
  grid: () => <LuLayoutGrid className='text-xl group-hover:text-tcblue' />,
  arrowRight: () => (
    <svg
      width='10'
      height='17'
      viewBox='0 0 10 17'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M1 1L8.5 8.5L1 16'
        stroke='white'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  ),
  iconMobile: () => (
    <svg
      width='21'
      height='23'
      viewBox='0 0 17 21'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M10.2928 12.8835C9.25992 13.0293 8.20968 13.001 7.18628 12.7998C8.10138 15.4913 9.01447 18.1848 9.92556 20.8804H13.2067L10.2928 12.8835ZM8.60709 9.04358H5.02496V9.07349L6.73475 10.168C7.01529 10.3487 7.3279 10.4745 7.65587 10.5389C7.98166 10.6046 8.31743 10.6046 8.64321 10.5389L9.12485 10.4492L8.60709 9.04358ZM3.85701 11.5318L0.449463 20.8804H3.68241L6.4819 12.6383C5.54929 12.4225 4.66125 12.0481 3.85701 11.5318Z'
        fill='#EEE5D9'
      />
      <path
        d='M7.64978 8.32583C7.32403 8.26035 7.01359 8.13455 6.73468 7.955L3.0502 5.60439L2.55051 8.14041C2.30969 9.37254 4.35663 10.8021 7.05978 11.3344C9.76294 11.8667 12.2012 11.2985 12.4781 10.0723L12.9778 7.53631L8.67324 8.33181C8.34485 8.39156 8.00827 8.39156 7.67988 8.33181L7.64978 8.32583Z'
        fill='#EEE5D9'
      />
      <path
        d='M16.4997 5.00028C16.4837 5.0858 16.4416 5.16436 16.3791 5.22534C16.3167 5.28631 16.2369 5.32676 16.1505 5.34121L8.61301 6.72885C8.12335 6.81938 7.61738 6.72098 7.19822 6.45372L2.52038 3.46312L2.05079 5.8556C2.1468 5.95264 2.21776 6.07132 2.2576 6.20151C2.29743 6.3317 2.30497 6.46953 2.27956 6.60325C2.25802 6.72919 2.20776 6.84856 2.13262 6.95223C2.05749 7.05591 1.95948 7.14112 1.8461 7.20137V8.68471C1.84813 8.78261 1.82793 8.87971 1.78701 8.9688C1.7461 9.05789 1.6855 9.13667 1.60974 9.19931C1.53397 9.26194 1.44497 9.30681 1.34935 9.33059C1.25374 9.35437 1.15396 9.35644 1.05742 9.33666L0.702222 9.27086C0.604842 9.25245 0.512992 9.21215 0.43369 9.15306C0.354388 9.09398 0.289732 9.01765 0.244671 8.92993C0.201592 8.8424 0.179199 8.74625 0.179199 8.64882C0.179199 8.55138 0.201592 8.45523 0.244671 8.3677L0.84671 6.99801C0.765668 6.90351 0.707296 6.79195 0.676008 6.67175C0.64472 6.55156 0.641331 6.42587 0.666096 6.30419C0.693915 6.1724 0.753315 6.04923 0.839255 5.9451C0.925194 5.84098 1.03514 5.75898 1.15977 5.70607L1.7016 2.94873L0.798545 2.35061C0.724103 2.30434 0.665561 2.2367 0.630669 2.15665C0.595777 2.07659 0.586181 1.9879 0.603151 1.9023C0.620121 1.81671 0.662858 1.73825 0.725702 1.67732C0.788546 1.61639 0.868533 1.57586 0.955077 1.56109L6.10853 0.59812L9.11873 0L9.66056 0.340929L10.3047 0.735688L16.2469 4.53375C16.3353 4.57239 16.4083 4.63928 16.4541 4.72381C16.4999 4.80834 16.5159 4.90565 16.4997 5.00028Z'
        fill='#EEE5D9'
      />
      <path
        d='M10.3229 2.18314L9.67871 1.79436C9.73408 1.81839 9.78658 1.84848 9.83524 1.88408L10.3229 2.18314Z'
        fill='#EEE5D9'
      />
    </svg>
  ),
  picture: () => (
    <svg
      width='26'
      height='17'
      viewBox='0 0 15 12'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M0 1.63636C0 1.20237 0.169323 0.786158 0.470721 0.47928C0.772119 0.172402 1.1809 0 1.60714 0H13.3929C13.8191 0 14.2279 0.172402 14.5293 0.47928C14.8307 0.786158 15 1.20237 15 1.63636V10.3636C15 10.7976 14.8307 11.2138 14.5293 11.5207C14.2279 11.8276 13.8191 12 13.3929 12H1.60714C1.1809 12 0.772119 11.8276 0.470721 11.5207C0.169323 11.2138 0 10.7976 0 10.3636V1.63636ZM1.07143 8.95273V10.3636C1.07143 10.6647 1.31143 10.9091 1.60714 10.9091H13.3929C13.5349 10.9091 13.6712 10.8516 13.7717 10.7493C13.8721 10.647 13.9286 10.5083 13.9286 10.3636V8.95273L12.0071 6.99709C11.8062 6.7928 11.5339 6.67805 11.25 6.67805C10.9661 6.67805 10.6938 6.7928 10.4929 6.99709L9.86429 7.63636L10.5571 8.34182C10.6098 8.39176 10.652 8.45197 10.6813 8.51888C10.7106 8.58579 10.7263 8.65802 10.7276 8.73126C10.7288 8.8045 10.7156 8.87724 10.6887 8.94516C10.6617 9.01308 10.6216 9.07478 10.5707 9.12657C10.5199 9.17837 10.4593 9.2192 10.3926 9.24664C10.3259 9.27407 10.2544 9.28754 10.1825 9.28625C10.1106 9.28496 10.0396 9.26893 9.9739 9.23911C9.90819 9.2093 9.84904 9.16632 9.8 9.11273L6.11429 5.36073C5.91339 5.15644 5.64107 5.04169 5.35714 5.04169C5.07321 5.04169 4.80089 5.15644 4.6 5.36073L1.07143 8.95345V8.95273ZM8.30357 3.27273C8.30357 3.05573 8.38823 2.84762 8.53893 2.69419C8.68963 2.54075 8.89402 2.45455 9.10714 2.45455C9.32026 2.45455 9.52466 2.54075 9.67535 2.69419C9.82605 2.84762 9.91071 3.05573 9.91071 3.27273C9.91071 3.48972 9.82605 3.69783 9.67535 3.85127C9.52466 4.00471 9.32026 4.09091 9.10714 4.09091C8.89402 4.09091 8.68963 4.00471 8.53893 3.85127C8.38823 3.69783 8.30357 3.48972 8.30357 3.27273Z'
        fill='#1D1D1D'
      />
    </svg>
  ),

  edit: () => (
    <svg
      width='21'
      height='21'
      viewBox='0 0 17 17'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M15.4224 0.608546C15.0327 0.218897 14.5042 0 13.9531 0C13.402 0 12.8735 0.218897 12.4838 0.608546L11.5678 1.5245L14.5065 4.46317L15.4224 3.54721C15.8121 3.1575 16.031 2.62897 16.031 2.07788C16.031 1.52679 15.8121 0.99826 15.4224 0.608546ZM13.6665 5.30313L10.7279 2.36446L4.07786 9.01446C3.58929 9.50279 3.23013 10.1052 3.03286 10.7672L2.39953 12.8928C2.36895 12.9954 2.36667 13.1043 2.39293 13.2081C2.41919 13.3119 2.47301 13.4066 2.54869 13.4823C2.62438 13.558 2.71912 13.6118 2.82288 13.6381C2.92665 13.6643 3.03558 13.662 3.13815 13.6315L5.26378 12.9981C5.92579 12.8009 6.5282 12.4417 7.01653 11.9531L13.6665 5.30313Z'
        fill='#BAB5B8'
      />
      <path
        d='M2.375 2.96851C1.74511 2.96851 1.14102 3.21873 0.695621 3.66413C0.250223 4.10953 0 4.71362 0 5.34351V13.656C0 14.2859 0.250223 14.89 0.695621 15.3354C1.14102 15.7808 1.74511 16.031 2.375 16.031H10.6875C11.3174 16.031 11.9215 15.7808 12.3669 15.3354C12.8123 14.89 13.0625 14.2859 13.0625 13.656V9.49976C13.0625 9.34228 12.9999 9.19126 12.8886 9.07991C12.7772 8.96856 12.6262 8.90601 12.4688 8.90601C12.3113 8.90601 12.1603 8.96856 12.0489 9.07991C11.9376 9.19126 11.875 9.34228 11.875 9.49976V13.656C11.875 13.971 11.7499 14.273 11.5272 14.4957C11.3045 14.7184 11.0024 14.8435 10.6875 14.8435H2.375C2.06006 14.8435 1.75801 14.7184 1.53531 14.4957C1.31261 14.273 1.1875 13.971 1.1875 13.656V5.34351C1.1875 5.02856 1.31261 4.72652 1.53531 4.50382C1.75801 4.28112 2.06006 4.15601 2.375 4.15601H6.53125C6.68872 4.15601 6.83974 4.09345 6.95109 3.9821C7.06244 3.87075 7.125 3.71973 7.125 3.56226C7.125 3.40478 7.06244 3.25376 6.95109 3.14241C6.83974 3.03106 6.68872 2.96851 6.53125 2.96851H2.375Z'
        fill='#BAB5B8'
      />
    </svg>
  ),
  delete: () => (
    <svg
      width='20'
      height='20'
      viewBox='0 0 17 17'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M9.65879 6.19257L9.38618 13.1155M5.61382 13.1155L5.34121 6.19257M13.1948 3.72341C13.4642 3.7634 13.7321 3.80571 14 3.85109M13.1948 3.72341L12.3533 14.4024C12.319 14.8371 12.1178 15.2432 11.79 15.5394C11.4622 15.8356 11.032 16.0001 10.5853 16H4.41467C3.96802 16.0001 3.53778 15.8356 3.20998 15.5394C2.88219 15.2432 2.68101 14.8371 2.64667 14.4024L1.80521 3.72341M13.1948 3.72341C12.2855 3.58919 11.3715 3.48733 10.4545 3.41803M1.80521 3.72341C1.53576 3.76263 1.26788 3.80494 1 3.85032M1.80521 3.72341C2.71453 3.58919 3.62855 3.48733 4.54545 3.41803M10.4545 3.41803V2.71343C10.4545 1.80576 9.73758 1.04886 8.80788 1.0204C7.93618 0.9932 7.06382 0.9932 6.19212 1.0204C5.26242 1.04886 4.54545 1.80653 4.54545 2.71343V3.41803M10.4545 3.41803C8.48778 3.26963 6.51222 3.26963 4.54545 3.41803'
        stroke='#BBB6B9'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  ),
  menu: () => (
    <svg
      width='22'
      height='14'
      viewBox='0 0 18 12'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M0 0.75C0 0.551088 0.0790175 0.360322 0.21967 0.21967C0.360322 0.0790175 0.551088 0 0.75 0H17.25C17.4489 0 17.6397 0.0790175 17.7803 0.21967C17.921 0.360322 18 0.551088 18 0.75C18 0.948912 17.921 1.13968 17.7803 1.28033C17.6397 1.42098 17.4489 1.5 17.25 1.5H0.75C0.551088 1.5 0.360322 1.42098 0.21967 1.28033C0.0790175 1.13968 0 0.948912 0 0.75ZM0 6C0 5.80109 0.0790175 5.61032 0.21967 5.46967C0.360322 5.32902 0.551088 5.25 0.75 5.25H17.25C17.4489 5.25 17.6397 5.32902 17.7803 5.46967C17.921 5.61032 18 5.80109 18 6C18 6.19891 17.921 6.38968 17.7803 6.53033C17.6397 6.67098 17.4489 6.75 17.25 6.75H0.75C0.551088 6.75 0.360322 6.67098 0.21967 6.53033C0.0790175 6.38968 0 6.19891 0 6ZM0 11.25C0 11.0511 0.0790175 10.8603 0.21967 10.7197C0.360322 10.579 0.551088 10.5 0.75 10.5H17.25C17.4489 10.5 17.6397 10.579 17.7803 10.7197C17.921 10.8603 18 11.0511 18 11.25C18 11.4489 17.921 11.6397 17.7803 11.7803C17.6397 11.921 17.4489 12 17.25 12H0.75C0.551088 12 0.360322 11.921 0.21967 11.7803C0.0790175 11.6397 0 11.4489 0 11.25Z'
        fill='black'
      />
    </svg>
  ),
  arrowDown: () => (
    <svg
      width='17'
      height='10'
      viewBox='0 0 17 10'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M8.76129 8.79871C8.62067 8.93916 8.43004 9.01805 8.23129 9.01805C8.03254 9.01805 7.84192 8.93916 7.70129 8.79871L0.201292 1.29871C0.0688118 1.15653 -0.00331137 0.968487 0.000116847 0.774186C0.00354506 0.579885 0.0822571 0.394499 0.21967 0.257086C0.357083 0.119673 0.542468 0.0409614 0.736769 0.0375332C0.93107 0.034105 1.11912 0.106228 1.26129 0.238708L8.23129 7.20871L15.2013 0.238708C15.27 0.165021 15.3528 0.105919 15.4448 0.064927C15.5368 0.023935 15.6361 0.00189351 15.7368 0.000116722C15.8375 -0.00166006 15.9375 0.0168643 16.0309 0.0545854C16.1243 0.0923064 16.2091 0.148451 16.2803 0.21967C16.3515 0.290888 16.4077 0.375722 16.4454 0.46911C16.4831 0.562499 16.5017 0.662527 16.4999 0.76323C16.4981 0.863933 16.4761 0.963247 16.4351 1.05525C16.3941 1.14725 16.335 1.23005 16.2613 1.29871L8.76129 8.79871Z'
        fill='#C9C4C4'
      />
    </svg>
  ),
  plusBlack: () => (
    <svg
      width='18'
      height='18'
      viewBox='0 0 14 14'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M7 5V9M9 7H5M13 7C13 7.78793 12.8448 8.56815 12.5433 9.2961C12.2417 10.0241 11.7998 10.6855 11.2426 11.2426C10.6855 11.7998 10.0241 12.2417 9.2961 12.5433C8.56815 12.8448 7.78793 13 7 13C6.21207 13 5.43185 12.8448 4.7039 12.5433C3.97595 12.2417 3.31451 11.7998 2.75736 11.2426C2.20021 10.6855 1.75825 10.0241 1.45672 9.2961C1.15519 8.56815 1 7.78793 1 7C1 5.4087 1.63214 3.88258 2.75736 2.75736C3.88258 1.63214 5.4087 1 7 1C8.5913 1 10.1174 1.63214 11.2426 2.75736C12.3679 3.88258 13 5.4087 13 7Z'
        stroke='black'
        strokeOpacity='0.5'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  ),
  plusWhite: () => (
    <svg
      width='18'
      height='18'
      viewBox='0 0 14 14'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M7 5V9M9 7H5M13 7C13 7.78793 12.8448 8.56815 12.5433 9.2961C12.2417 10.0241 11.7998 10.6855 11.2426 11.2426C10.6855 11.7998 10.0241 12.2417 9.2961 12.5433C8.56815 12.8448 7.78793 13 7 13C6.21207 13 5.43185 12.8448 4.7039 12.5433C3.97595 12.2417 3.31451 11.7998 2.75736 11.2426C2.20021 10.6855 1.75825 10.0241 1.45672 9.2961C1.15519 8.56815 1 7.78793 1 7C1 5.4087 1.63214 3.88258 2.75736 2.75736C3.88258 1.63214 5.4087 1 7 1C8.5913 1 10.1174 1.63214 11.2426 2.75736C12.3679 3.88258 13 5.4087 13 7Z'
        stroke='white'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  ),
  tradecademy: () => (
    <svg
      width='16'
      height='11'
      viewBox='0 0 16 11'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M7.08955 7.51831C6.77913 7.45589 6.48313 7.33594 6.21682 7.16465L2.72587 4.92292L2.25243 7.34148C2.02426 8.51654 3.93516 9.87983 6.52484 10.3875C9.11453 10.8952 11.3962 10.3533 11.6586 9.18393L12.132 6.76536L8.05356 7.52402C7.74434 7.58106 7.42729 7.58106 7.11807 7.52402L7.08955 7.51831Z'
        fill='#E6E2DC'
      />
      <path
        d='M15.4518 4.76867C15.4378 4.84977 15.399 4.92454 15.3408 4.98274C15.2826 5.04095 15.2078 5.07974 15.1267 5.09381L7.99081 6.41718C7.52688 6.50351 7.04748 6.40967 6.65033 6.15479L2.22961 3.30841L1.77898 5.59007C1.86996 5.68262 1.93718 5.7958 1.97493 5.91996C2.01267 6.04412 2.01982 6.17557 1.99574 6.30309C1.97533 6.4232 1.92771 6.53705 1.85652 6.63592C1.78534 6.73479 1.69248 6.81606 1.58504 6.87351V8.28814C1.58483 8.38156 1.56432 8.47381 1.52492 8.55852C1.48552 8.64322 1.42818 8.71835 1.35688 8.7787C1.28494 8.83868 1.20037 8.88164 1.1095 8.90436C1.01863 8.92707 0.9238 8.92897 0.832094 8.90989L0.495549 8.84715C0.404019 8.82767 0.317827 8.7885 0.242963 8.73235C0.1681 8.6762 0.10636 8.60443 0.0620332 8.52201C0.0212169 8.43853 0 8.34684 0 8.25391C0 8.16099 0.0212169 8.0693 0.0620332 7.98582L0.632449 6.67957C0.555664 6.58944 0.500361 6.48305 0.470716 6.36843C0.441071 6.2538 0.43786 6.13393 0.461324 6.01789C0.487682 5.8922 0.54396 5.77473 0.625385 5.67543C0.706811 5.57613 0.810982 5.49794 0.929065 5.44747L1.44814 2.81785L0.575407 2.23603C0.506424 2.19044 0.45235 2.12559 0.4199 2.04953C0.387449 1.97348 0.378052 1.88957 0.392874 1.80822C0.409554 1.72732 0.449917 1.65321 0.508829 1.59532C0.567741 1.53742 0.64254 1.49835 0.723715 1.48308L5.62929 0.570416L8.48137 0L8.99474 0.325137L9.60509 0.701611L15.2351 4.32375C15.3153 4.36351 15.3801 4.42875 15.4193 4.50925C15.4586 4.58975 15.47 4.68098 15.4518 4.76867Z'
        fill='#E6E2DC'
      />
    </svg>
  ),
  journal: () => <BsJournalText />,
  statistics: () => (
    <svg
      width='13'
      height='14'
      viewBox='0 0 13 14'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect x='0.5' y='0.5' width='12' height='13' rx='1.5' stroke='#E6E2DC' />
      <rect
        x='8.75'
        y='3.25'
        width='6.5'
        height='0.5'
        rx='0.25'
        transform='rotate(90 8.75 3.25)'
        stroke='#E6E2DC'
        stroke-width='0.5'
      />
      <rect
        x='6.75'
        y='5.25'
        width='4.5'
        height='0.5'
        rx='0.25'
        transform='rotate(90 6.75 5.25)'
        stroke='#E6E2DC'
        stroke-width='0.5'
      />
      <rect
        x='4.75'
        y='7.25'
        width='2.5'
        height='0.5'
        rx='0.25'
        transform='rotate(90 4.75 7.25)'
        stroke='#E6E2DC'
        stroke-width='0.5'
      />
    </svg>
  ),
  homework: () => (
    <svg
      width='11'
      height='11'
      viewBox='0 0 11 11'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M10.447 5.50159C10.3011 5.50159 10.1613 5.55952 10.0582 5.66264C9.95506 5.76575 9.89713 5.90561 9.89713 6.05143V9.35048C9.89713 9.4963 9.8392 9.63616 9.73609 9.73927C9.63297 9.84239 9.49312 9.90032 9.34729 9.90032H1.64952C1.50369 9.90032 1.36384 9.84239 1.26073 9.73927C1.15761 9.63616 1.09968 9.4963 1.09968 9.35048V1.65271C1.09968 1.50688 1.15761 1.36703 1.26073 1.26391C1.36384 1.1608 1.50369 1.10287 1.64952 1.10287H4.94857C5.09439 1.10287 5.23425 1.04494 5.33736 0.941825C5.44048 0.83871 5.49841 0.698856 5.49841 0.553029C5.49841 0.407202 5.44048 0.267348 5.33736 0.164233C5.23425 0.0611176 5.09439 0.00318816 4.94857 0.00318816H1.64952C1.21204 0.00318816 0.792479 0.176977 0.483134 0.486322C0.173788 0.795667 0 1.21523 0 1.65271V9.35048C0 9.78796 0.173788 10.2075 0.483134 10.5169C0.792479 10.8262 1.21204 11 1.64952 11H9.34729C9.78477 11 10.2043 10.8262 10.5137 10.5169C10.823 10.2075 10.9968 9.78796 10.9968 9.35048V6.05143C10.9968 5.90561 10.9389 5.76575 10.8358 5.66264C10.7327 5.55952 10.5928 5.50159 10.447 5.50159ZM2.19936 5.91947V8.2508C2.19936 8.39662 2.25729 8.53648 2.36041 8.63959C2.46352 8.74271 2.60338 8.80064 2.7492 8.80064H5.08053C5.15289 8.80106 5.22462 8.78719 5.29161 8.75982C5.35861 8.73246 5.41954 8.69214 5.47091 8.64118L9.27581 4.83079L10.8374 3.30223C10.8889 3.25112 10.9298 3.1903 10.9577 3.1233C10.9856 3.0563 11 2.98443 11 2.91184C11 2.83926 10.9856 2.76739 10.9577 2.70039C10.9298 2.63339 10.8889 2.57257 10.8374 2.52146L8.50603 0.162642C8.45492 0.111106 8.39411 0.0702012 8.3271 0.0422865C8.2601 0.0143719 8.18823 0 8.11565 0C8.04306 0 7.97119 0.0143719 7.90419 0.0422865C7.83719 0.0702012 7.77637 0.111106 7.72526 0.162642L6.17471 1.71869L2.35882 5.52909C2.30786 5.58046 2.26754 5.64139 2.24018 5.70839C2.21281 5.77538 2.19894 5.84711 2.19936 5.91947ZM8.11565 1.3283L9.6717 2.88435L8.89092 3.66513L7.33487 2.10908L8.11565 1.3283ZM3.29904 6.14491L6.5596 2.88435L8.11565 4.4404L4.85509 7.70096H3.29904V6.14491Z'
        fill='#E6E2DC'
      />
    </svg>
  ),
  signals: () => (
    <svg
      width='13'
      height='14'
      viewBox='0 0 13 14'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect x='0.5' y='0.5' width='12' height='13' rx='1.5' stroke='#E6E2DC' />
      <line x1='1' y1='9.5' x2='2' y2='9.5' stroke='white' />
      <line x1='2' y1='8.5' x2='3' y2='8.5' stroke='white' />
      <line x1='4' y1='8.5' x2='5' y2='8.5' stroke='white' />
      <line x1='11' y1='5.5' x2='12' y2='5.5' stroke='white' />
      <line x1='10' y1='4.5' x2='11' y2='4.5' stroke='white' />
      <line x1='9' y1='5.5' x2='10' y2='5.5' stroke='white' />
      <line x1='8' y1='6.5' x2='9' y2='6.5' stroke='white' />
      <line x1='7' y1='7.5' x2='8' y2='7.5' stroke='white' />
      <line x1='5.99788' y1='6.546' x2='6.99788' y2='6.546' stroke='white' />
      <line x1='5' y1='7.5' x2='6' y2='7.5' stroke='white' />
      <line x1='3' y1='7.5' x2='4' y2='7.5' stroke='white' />
    </svg>
  ),
  offers: () => <MdOutlineLocalOffer />,
  icon: () => {
    return (
      <svg
        width='200'
        height='27'
        viewBox='0 0 137 21'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g clipPath='url(#clip0_2_101)'>
          <path
            d='M0 8.29593V10.7662H3.3654V20.9342H6.45988V10.7662H9.82528V8.29593H0Z'
            fill='#EEE5D9'
          />
          <path
            d='M18.4104 15.91C19.2286 15.7129 19.9548 15.2447 20.4692 14.5825C20.9836 13.9203 21.2554 13.1038 21.2399 12.2675C21.2477 11.5568 21.0648 10.857 20.7101 10.2398C20.3388 9.61763 19.7869 9.12143 19.1268 8.8163C18.3286 8.44687 17.4543 8.26864 16.5741 8.29594H11.3785V20.9342H14.4489V16.1493H15.1894L17.8324 20.9342H21.3182L18.4104 15.91ZM17.6638 13.5594C17.3101 13.8593 16.8511 14.0077 16.3875 13.9721H14.4489V10.8439H16.3634C16.5935 10.8258 16.8249 10.8535 17.0441 10.9254C17.2632 10.9973 17.4658 11.1119 17.6397 11.2626C17.7854 11.4105 17.8986 11.5867 17.9722 11.7803C18.0458 11.9738 18.0781 12.1805 18.0672 12.3871C18.0833 12.5994 18.0559 12.8128 17.9866 13.0143C17.9172 13.2159 17.8074 13.4013 17.6638 13.5594Z'
            fill='#EEE5D9'
          />
          <path
            d='M30.5174 8.29593H26.9352L22.3417 20.9342H25.5746C26.6222 17.8599 27.6657 14.7875 28.7052 11.7172C29.7447 14.7835 30.7883 17.8559 31.8358 20.9342H35.1109L30.5174 8.29593Z'
            fill='#EEE5D9'
          />
          <path
            d='M47.0975 11.3045C46.5545 10.3561 45.7476 9.58357 44.7736 9.07947C43.6856 8.53749 42.4806 8.26847 41.2638 8.29593H36.5076V20.9342H41.2638C42.4781 20.9617 43.6802 20.6883 44.7616 20.1387C45.7424 19.6427 46.5548 18.871 47.0975 17.9197C47.658 16.9118 47.9424 15.7754 47.9223 14.624C47.9492 13.4644 47.6645 12.3185 47.0975 11.3045ZM43.7923 17.2857C43.4244 17.6166 42.9936 17.8713 42.5253 18.0346C42.057 18.1979 41.5605 18.2666 41.0651 18.2367H39.5961V10.9157H41.0651C41.5624 10.8869 42.0604 10.9585 42.5291 11.126C42.9978 11.2936 43.4275 11.5537 43.7923 11.8906C44.1326 12.2523 44.3952 12.6791 44.5639 13.1449C44.7326 13.6108 44.804 14.1059 44.7736 14.6001C44.8056 15.0926 44.7349 15.5864 44.566 16.0505C44.3972 16.5147 44.1338 16.9392 43.7923 17.2976V17.2857Z'
            fill='#EEE5D9'
          />
          <path
            d='M57.4345 10.7662V8.29593H49.6562V20.9342H57.4345V18.446H52.7507V15.6827H56.8987V13.2902H52.7507V10.7662H57.4345Z'
            fill='#EEE5D9'
          />
          <path
            d='M66.8263 17.8001C66.347 18.0803 65.799 18.2231 65.243 18.2128C64.8074 18.2274 64.3739 18.1466 63.9733 17.976C63.5727 17.8055 63.2148 17.5493 62.9251 17.2259C62.3084 16.4852 61.9928 15.5422 62.0401 14.5822C62.0055 13.6271 62.3295 12.6934 62.9492 11.9624C63.2389 11.6389 63.5968 11.3828 63.9974 11.2122C64.398 11.0417 64.8315 10.9608 65.2671 10.9755C65.8127 10.9623 66.3517 11.0966 66.8263 11.3643C67.2975 11.6474 67.6728 12.064 67.904 12.5605H71.3055C70.9916 11.2656 70.2312 10.1207 69.1562 9.32469C68.0324 8.51574 66.6725 8.09549 65.2851 8.12845C64.1383 8.1231 63.0098 8.4137 62.01 8.9718C61.052 9.5059 60.2653 10.2979 59.7403 11.2566C59.1839 12.2786 58.9039 13.4265 58.9276 14.5881C58.9025 15.7481 59.1826 16.8944 59.7403 17.9137C60.2673 18.8678 61.0539 19.6554 62.01 20.1866C63.0195 20.7451 64.16 21.0278 65.3152 21.006C66.7022 21.0363 68.0613 20.6163 69.1863 19.8097C70.2635 19.0184 71.0247 17.8745 71.3356 16.5799H67.9341C67.7026 17.0918 67.3151 17.5186 66.8263 17.8001Z'
            fill='#EEE5D9'
          />
          <path
            d='M97.1571 11.3045C96.61 10.3572 95.8015 9.58512 94.8272 9.07947C93.7391 8.53749 92.5341 8.26847 91.3173 8.29593H86.5672V20.9342H91.3173C92.5335 20.9617 93.7376 20.6883 94.8211 20.1387C95.7995 19.6392 96.611 18.8684 97.1571 17.9197C97.7154 16.9112 97.9978 15.7748 97.9758 14.624C98.0049 13.4649 97.7223 12.319 97.1571 11.3045ZM93.8519 17.2857C93.483 17.6171 93.0512 17.872 92.5819 18.0353C92.1125 18.1986 91.615 18.2671 91.1186 18.2367H89.6556V10.9157H91.1186C91.6168 10.8865 92.1159 10.9578 92.5856 11.1253C93.0554 11.2929 93.4861 11.5532 93.8519 11.8906C94.1914 12.2526 94.453 12.6796 94.6207 13.1455C94.7884 13.6113 94.8587 14.1063 94.8272 14.6001C94.8599 15.0922 94.7902 15.5857 94.6224 16.0498C94.4545 16.5139 94.1923 16.9387 93.8519 17.2976V17.2857Z'
            fill='#EEE5D9'
          />
          <path
            d='M107.494 10.7662V8.29593H99.7157V20.9342H107.494V18.446H102.81V15.6827H106.952V13.2902H102.81V10.7662H107.494Z'
            fill='#EEE5D9'
          />
          <path
            d='M120.245 8.29593L116.717 17.0225L113.183 8.29593H109.535V20.9342H112.581V13.3261L115.453 20.9342H117.951L120.793 13.368V20.9342H123.882V8.29593H120.245Z'
            fill='#EEE5D9'
          />
          <path
            d='M133.526 8.29593L131.118 13.5773L128.656 8.29593H125.146L129.511 16.7474V20.9342H132.605V16.7474L137 8.30191L133.526 8.29593Z'
            fill='#EEE5D9'
          />
          <path
            d='M82.2927 12.8835C81.2598 13.0293 80.2096 13.001 79.1862 12.7998C80.1013 15.4913 81.0144 18.1848 81.9255 20.8804H85.2066L82.2927 12.8835ZM80.607 9.04358H77.0249V9.07349L78.7347 10.168C79.0152 10.3487 79.3278 10.4745 79.6558 10.5389C79.9816 10.6046 80.3173 10.6046 80.6431 10.5389L81.1248 10.4492L80.607 9.04358ZM75.8569 11.5318L72.4494 20.8804H75.6823L78.4818 12.6383C77.5492 12.4225 76.6612 12.0481 75.8569 11.5318Z'
            fill='#EEE5D9'
          />
          <path
            d='M79.6498 8.32583C79.324 8.26035 79.0136 8.13455 78.7347 7.955L75.0502 5.60439L74.5505 8.14041C74.3097 9.37254 76.3566 10.8021 79.0598 11.3344C81.7629 11.8667 84.2012 11.2985 84.4781 10.0723L84.9778 7.53631L80.6732 8.33181C80.3449 8.39156 80.0083 8.39156 79.6799 8.33181L79.6498 8.32583Z'
            fill='#EEE5D9'
          />
          <path
            d='M88.4997 5.00028C88.4837 5.0858 88.4416 5.16436 88.3791 5.22534C88.3167 5.28631 88.2369 5.32676 88.1506 5.34121L80.613 6.72885C80.1234 6.81938 79.6174 6.72098 79.1982 6.45372L74.5204 3.46312L74.0508 5.8556C74.1468 5.95264 74.2178 6.07132 74.2576 6.20151C74.2974 6.3317 74.305 6.46953 74.2796 6.60325C74.258 6.72919 74.2078 6.84856 74.1326 6.95223C74.0575 7.05591 73.9595 7.14112 73.8461 7.20137V8.68471C73.8481 8.78261 73.8279 8.87971 73.787 8.9688C73.7461 9.05789 73.6855 9.13667 73.6098 9.19931C73.534 9.26194 73.445 9.30681 73.3494 9.33059C73.2538 9.35437 73.154 9.35644 73.0574 9.33666L72.7022 9.27086C72.6049 9.25245 72.513 9.21215 72.4337 9.15306C72.3544 9.09398 72.2897 9.01765 72.2447 8.92993C72.2016 8.8424 72.1792 8.74625 72.1792 8.64882C72.1792 8.55138 72.2016 8.45523 72.2447 8.3677L72.8467 6.99801C72.7657 6.90351 72.7073 6.79195 72.676 6.67175C72.6447 6.55156 72.6413 6.42587 72.6661 6.30419C72.6939 6.1724 72.7533 6.04923 72.8393 5.9451C72.9252 5.84098 73.0352 5.75898 73.1598 5.70607L73.7016 2.94873L72.7986 2.35061C72.7241 2.30434 72.6656 2.2367 72.6307 2.15665C72.5958 2.07659 72.5862 1.9879 72.6032 1.9023C72.6201 1.81671 72.6629 1.73825 72.7257 1.67732C72.7886 1.61639 72.8685 1.57586 72.9551 1.56109L78.1085 0.59812L81.1187 0L81.6606 0.340929L82.3048 0.735688L88.2469 4.53375C88.3353 4.57239 88.4083 4.63928 88.4541 4.72381C88.4999 4.80834 88.516 4.90565 88.4997 5.00028Z'
            fill='#EEE5D9'
          />
          <path
            d='M82.3228 2.18314L81.6786 1.79436C81.734 1.81839 81.7865 1.84848 81.8352 1.88408L82.3228 2.18314Z'
            fill='#EEE5D9'
          />
        </g>
        <defs>
          <clipPath id='clip0_2_101'>
            <rect width='137' height='21' fill='white' />
          </clipPath>
        </defs>
      </svg>
    )
  },
}
