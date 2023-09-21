import type { BaseBlockModel } from '@notes/store';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import type { ParagraphType } from '../../paragraph-block/index.js';

const bulleted = html`<svg
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M4.29999 7.5C4.85227 7.5 5.29999 7.05228 5.29999 6.5C5.29999 5.94772 4.85227 5.5 4.29999 5.5C3.7477 5.5 3.29999 5.94772 3.29999 6.5C3.29999 7.05228 3.7477 7.5 4.29999 7.5ZM8.33335 5.75073C7.91914 5.75071 7.58334 6.08648 7.58331 6.50069C7.58329 6.9149 7.91906 7.25071 8.33327 7.25073L20.2499 7.2514C20.6641 7.25142 20.9999 6.91565 21 6.50144C21 6.08722 20.6642 5.75142 20.25 5.7514L8.33335 5.75073ZM8.33336 11.2508C7.91914 11.2508 7.58334 11.5865 7.58331 12.0007C7.58329 12.415 7.91905 12.7508 8.33327 12.7508L20.25 12.7515C20.6642 12.7515 21 12.4158 21 12.0015C21 11.5873 20.6643 11.2515 20.2501 11.2515L8.33336 11.2508ZM8.33336 16.7508C7.91914 16.7508 7.58334 17.0865 7.58331 17.5007C7.58329 17.915 7.91905 18.2508 8.33327 18.2508L20.25 18.2515C20.6642 18.2515 21 17.9158 21 17.5016C21 17.0873 20.6643 16.7515 20.25 16.7515L8.33336 16.7508ZM5.29999 12C5.29999 12.5523 4.85227 13 4.29999 13C3.7477 13 3.29999 12.5523 3.29999 12C3.29999 11.4477 3.7477 11 4.29999 11C4.85227 11 5.29999 11.4477 5.29999 12ZM4.29999 18.5C4.85227 18.5 5.29999 18.0523 5.29999 17.5C5.29999 16.9477 4.85227 16.5 4.29999 16.5C3.7477 16.5 3.29999 16.9477 3.29999 17.5C3.29999 18.0523 3.7477 18.5 4.29999 18.5Z"
    fill="currentColor"
  />
</svg> `;
const numbered = html`<svg
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M4.1287 5.76205C4.18101 5.74447 4.22813 5.71723 4.27846 5.68228L4.53386 5.50534V7.63997C4.53386 7.82761 4.59717 7.9904 4.71548 8.10631C4.83355 8.222 4.99776 8.28258 5.18421 8.28258C5.37066 8.28258 5.53488 8.222 5.65295 8.10631C5.77126 7.9904 5.83457 7.82761 5.83457 7.63997V4.93384C5.83457 4.72505 5.76932 4.54353 5.6384 4.41417C5.50756 4.2849 5.32242 4.21887 5.10409 4.21887C4.88258 4.21887 4.6705 4.24086 4.42948 4.40154L3.75168 4.85427C3.57975 4.97094 3.5 5.12628 3.5 5.31379C3.5 5.58698 3.70304 5.7858 3.96426 5.7858C4.02312 5.7858 4.07561 5.7799 4.1287 5.76205ZM9.40567 5.6015C8.98147 5.60148 8.63757 5.94534 8.63755 6.36953C8.63752 6.79373 8.98138 7.13762 9.40557 7.13765L19.7319 7.13827C20.1561 7.1383 20.5 6.79444 20.5 6.37024C20.5 5.94605 20.1562 5.60215 19.732 5.60213L9.40567 5.6015ZM9.40567 11.234C8.98147 11.234 8.63757 11.5779 8.63755 12.0021C8.63752 12.4263 8.98138 12.7702 9.40557 12.7702L19.7319 12.7708C20.1561 12.7708 20.5 12.427 20.5 12.0028C20.5 11.5786 20.1562 11.2347 19.732 11.2347L9.40567 11.234ZM9.40567 16.8666C8.98147 16.8666 8.63757 17.2104 8.63755 17.6346C8.63752 18.0588 8.98138 18.4027 9.40557 18.4027L19.7319 18.4033C20.1561 18.4034 20.5 18.0595 20.5 17.6353C20.5 17.2111 20.1562 16.8672 19.732 16.8672L9.40567 16.8666ZM6.62426 11.114C6.63609 11.048 6.6419 10.9782 6.6419 10.9031C6.6419 10.2259 6.06294 9.7684 5.15573 9.7684C4.5044 9.7684 3.97971 10.045 3.78328 10.4895C3.77042 10.5192 3.76022 10.5492 3.75251 10.5798C3.76022 10.5492 3.77044 10.5191 3.78331 10.4894C3.97974 10.0449 4.50442 9.7683 5.15575 9.7683C6.06297 9.7683 6.64193 10.2258 6.64193 10.903C6.64193 10.9782 6.6361 11.048 6.62426 11.114ZM5.12474 12.7537L5.12471 12.7537V12.7744H6.30848C6.58246 12.7744 6.73753 12.9372 6.73753 13.1879C6.73753 13.2197 6.73493 13.2502 6.72981 13.2792C6.73495 13.2502 6.73756 13.2196 6.73756 13.1878C6.73756 12.9371 6.58248 12.7743 6.30851 12.7743H5.12474V12.7537ZM3.73998 12.9913C3.77464 12.8518 3.86616 12.7304 4.02368 12.5985L5.04978 11.7197C5.38832 11.4292 5.53086 11.2672 5.57304 11.0983C5.5309 11.2672 5.38836 11.4293 5.04976 11.7198L4.02365 12.5986C3.86617 12.7305 3.77466 12.8519 3.73998 12.9913ZM4.50342 11.1816C4.59839 11.1252 4.67754 11.0396 4.75422 10.9274C4.81979 10.8327 4.87897 10.7719 4.93846 10.7343C4.99601 10.6979 5.05933 10.6797 5.14025 10.6797C5.25266 10.6797 5.33878 10.7139 5.39544 10.7645C5.45119 10.8143 5.48498 10.8855 5.48498 10.9753C5.48498 11.1448 5.40603 11.2791 4.9831 11.642L3.95747 12.5204C3.73832 12.704 3.62145 12.8851 3.62145 13.1283C3.62145 13.2841 3.66578 13.4314 3.77329 13.5397C3.88112 13.6484 4.03847 13.7037 4.23562 13.7037H6.30851C6.46671 13.7037 6.60202 13.6548 6.69803 13.5592C6.79392 13.4637 6.83997 13.3323 6.83997 13.1878C6.83997 13.0412 6.79418 12.9093 6.6977 12.8141C6.60129 12.719 6.46582 12.6718 6.30851 12.6718H5.37617L5.87155 12.2443C6.15942 11.9949 6.3783 11.7967 6.52349 11.5947C6.67287 11.3868 6.74434 11.1753 6.74434 10.903C6.74434 10.5321 6.58449 10.2187 6.30157 10.0006C6.02097 9.78425 5.62548 9.66589 5.15575 9.66589C4.48013 9.66589 3.90785 9.95417 3.68934 10.4487C3.64978 10.54 3.63179 10.6341 3.63179 10.7324C3.63179 10.8869 3.68238 11.0223 3.78385 11.1187C3.8847 11.2145 4.02467 11.2613 4.18393 11.2613C4.30216 11.2613 4.40667 11.2391 4.50342 11.1816ZM3.67138 16.0785C3.82347 15.664 4.34013 15.2247 5.22801 15.2247C5.68517 15.2247 6.09277 15.3214 6.38781 15.5143C6.68486 15.7085 6.86644 15.9999 6.86644 16.3799C6.86644 16.8627 6.55828 17.1838 6.17395 17.3212C6.40817 17.3704 6.60427 17.4641 6.75036 17.5998C6.93436 17.7707 7.035 18.0045 7.035 18.2873C7.035 18.6915 6.86059 19.0236 6.54548 19.2529C6.23205 19.4811 5.78277 19.6055 5.23363 19.6055C4.27385 19.6055 3.73928 19.1473 3.59258 18.7372C3.56511 18.6608 3.55307 18.5763 3.55307 18.5092C3.55307 18.3499 3.60652 18.216 3.70785 18.1223C3.80872 18.0289 3.95152 17.9805 4.12117 17.9805C4.23774 17.9805 4.33814 17.9997 4.42613 18.0439C4.51436 18.0882 4.58653 18.1558 4.64935 18.247C4.72378 18.3559 4.79404 18.4374 4.8851 18.4925C4.97546 18.5471 5.09131 18.5788 5.26173 18.5788C5.53989 18.5788 5.7218 18.414 5.7218 18.2002C5.7218 18.0706 5.67315 17.9761 5.58111 17.9118C5.48617 17.8455 5.33953 17.8076 5.13812 17.8076H5.11003C4.96167 17.8076 4.84264 17.7662 4.76061 17.6859C4.67849 17.6054 4.64024 17.4925 4.64024 17.3631C4.64024 17.2388 4.6788 17.1269 4.76042 17.0461C4.84209 16.9653 4.96094 16.9214 5.11003 16.9214H5.13812C5.3156 16.9214 5.449 16.8827 5.53665 16.8186C5.62237 16.7559 5.66843 16.6661 5.66843 16.5512C5.66843 16.4399 5.62767 16.3529 5.5564 16.293C5.48412 16.2322 5.37547 16.1951 5.23363 16.1951C5.1199 16.1951 5.02579 16.2182 4.94752 16.2628C4.86935 16.3074 4.80383 16.3753 4.74999 16.4698C4.68013 16.5935 4.60457 16.683 4.50858 16.7408C4.41232 16.7988 4.30106 16.8216 4.16612 16.8216C3.99313 16.8216 3.85731 16.7706 3.76471 16.6781C3.67224 16.5856 3.62892 16.4576 3.62892 16.3153C3.62892 16.2303 3.64147 16.1623 3.67138 16.0785Z"
    fill="currentColor"
  />
</svg> `;
const todo = html`<svg
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M6 3.25C4.48122 3.25 3.25 4.48122 3.25 6V18C3.25 19.5188 4.48122 20.75 6 20.75H18C19.5188 20.75 20.75 19.5188 20.75 18V6C20.75 4.48122 19.5188 3.25 18 3.25H6ZM4.75 6C4.75 5.30964 5.30964 4.75 6 4.75H18C18.6904 4.75 19.25 5.30964 19.25 6V18C19.25 18.6904 18.6904 19.25 18 19.25H6C5.30964 19.25 4.75 18.6904 4.75 18V6ZM16.5303 9.53033C16.8232 9.23744 16.8232 8.76256 16.5303 8.46967C16.2374 8.17678 15.7626 8.17678 15.4697 8.46967L10.5 13.4393L9.03033 11.9697C8.73744 11.6768 8.26256 11.6768 7.96967 11.9697C7.67678 12.2626 7.67678 12.7374 7.96967 13.0303L9.96967 15.0303C10.2626 15.3232 10.7374 15.3232 11.0303 15.0303L16.5303 9.53033Z"
    fill="currentColor"
  />
</svg> `;
const toggle = html`<svg
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M6 3.25C4.48122 3.25 3.25 4.48122 3.25 6V18C3.25 19.5188 4.48122 20.75 6 20.75H18C19.5188 20.75 20.75 19.5188 20.75 18V6C20.75 4.48122 19.5188 3.25 18 3.25H6ZM4.75 6C4.75 5.30964 5.30964 4.75 6 4.75H18C18.6904 4.75 19.25 5.30964 19.25 6V18C19.25 18.6904 18.6904 19.25 18 19.25H6C5.30964 19.25 4.75 18.6904 4.75 18V6ZM16.5303 9.53033C16.8232 9.23744 16.8232 8.76256 16.5303 8.46967C16.2374 8.17678 15.7626 8.17678 15.4697 8.46967L10.5 13.4393L9.03033 11.9697C8.73744 11.6768 8.26256 11.6768 7.96967 11.9697C7.67678 12.2626 7.67678 12.7374 7.96967 13.0303L9.96967 15.0303C10.2626 15.3232 10.7374 15.3232 11.0303 15.0303L16.5303 9.53033Z"
    fill="currentColor"
  />
</svg> `;
const text = html`<svg
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M3.25 4C3.25 3.58579 3.58579 3.25 4 3.25H20C20.4142 3.25 20.75 3.58579 20.75 4V6.66667C20.75 7.08088 20.4142 7.41667 20 7.41667C19.5858 7.41667 19.25 7.08088 19.25 6.66667V4.75H12.75V19.25H16C16.4142 19.25 16.75 19.5858 16.75 20C16.75 20.4142 16.4142 20.75 16 20.75H8C7.58579 20.75 7.25 20.4142 7.25 20C7.25 19.5858 7.58579 19.25 8 19.25H11.25V4.75H4.75V6.66667C4.75 7.08088 4.41421 7.41667 4 7.41667C3.58579 7.41667 3.25 7.08088 3.25 6.66667V4Z"
    fill="currentColor"
  />
</svg> `;
const quote = html`<svg
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M5 10.9655V11.0953V15.0608C5 15.6262 5.45838 16.0846 6.02382 16.0846H10.119C10.6845 16.0846 11.1429 15.6262 11.1429 15.0608V10.9655C11.1429 10.4001 10.6845 9.9417 10.119 9.9417H6.70422C7.17415 8.66255 8.40313 7.75 9.84524 7.75V6.25C7.24961 6.25 5.13069 8.29105 5.00582 10.8557C5.00197 10.8918 5 10.9284 5 10.9655ZM13 10.9655V11.0953V15.0608C13 15.6262 13.4584 16.0846 14.0238 16.0846H18.119C18.6845 16.0846 19.1429 15.6262 19.1429 15.0608V10.9655C19.1429 10.4001 18.6845 9.9417 18.119 9.9417H14.7042C15.1741 8.66255 16.4031 7.75 17.8452 7.75V6.25C15.2496 6.25 13.1307 8.29105 13.0058 10.8557C13.002 10.8918 13 10.9284 13 10.9655Z"
    fill="currentColor"
  />
</svg> `;
const h1 = html`<svg
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M17.9256 6.5784V17.4764C17.9256 18.078 18.2564 18.4389 18.7878 18.4389C19.3292 18.4389 19.65 18.088 19.65 17.4764V5.72621C19.65 5.04445 19.1988 4.57324 18.5572 4.57324C18.1662 4.57324 17.8153 4.72363 17.1836 5.19484L15.1584 6.69871C14.7574 6.98946 14.5669 7.26016 14.5669 7.55091C14.5669 7.93189 14.8677 8.24269 15.2386 8.24269C15.4592 8.24269 15.6697 8.16248 15.9605 7.95194L17.8453 6.5784H17.9256ZM4.41998 4.90259C4.84523 4.90259 5.18996 5.24732 5.18996 5.67257V11.0239H11.3584V5.67257C11.3584 5.24732 11.7031 4.90259 12.1284 4.90259C12.5536 4.90259 12.8983 5.24732 12.8983 5.67257V11.7939V17.9153C12.8983 18.3405 12.5536 18.6853 12.1284 18.6853C11.7031 18.6853 11.3584 18.3405 11.3584 17.9153V12.5639H5.18996V17.9153C5.18996 18.3405 4.84523 18.6853 4.41998 18.6853C3.99473 18.6853 3.64999 18.3405 3.64999 17.9153V5.67257C3.64999 5.24732 3.99473 4.90259 4.41998 4.90259Z"
    fill="currentColor"
  />
</svg> `;
const h2 = html`<svg
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M14.1588 15.9996C13.5966 16.6381 13.4346 16.9049 13.4346 17.2479C13.4346 17.8006 13.873 18.1342 14.5686 18.1342H20.8578C21.3819 18.1342 21.6869 17.8578 21.6869 17.4099C21.6869 16.9525 21.3629 16.6762 20.8578 16.6762H15.5691V16.5618L19.0949 12.531C20.8102 10.5775 21.2962 9.67223 21.2962 8.43344C21.2962 6.33702 19.6476 4.85046 17.3035 4.85046C14.7878 4.85046 13.2154 6.54666 13.2154 8.16662C13.2154 8.6812 13.5204 9.03378 13.9873 9.03378C14.378 9.03378 14.6448 8.77649 14.7782 8.27144C15.0641 7.03265 15.9694 6.2989 17.1986 6.2989C18.6471 6.2989 19.6095 7.19464 19.6095 8.53826C19.6095 9.434 19.1998 10.2345 18.123 11.4637L14.1588 15.9996ZM3.41871 5.36361C3.82289 5.36361 4.15055 5.69127 4.15055 6.09545V11.1818H10.0134V6.09545C10.0134 5.69127 10.341 5.36361 10.7452 5.36361C11.1494 5.36361 11.4771 5.69127 11.4771 6.09545V11.9136V17.7317C11.4771 18.1359 11.1494 18.4636 10.7452 18.4636C10.341 18.4636 10.0134 18.1359 10.0134 17.7317V12.6454H4.15055V17.7317C4.15055 18.1359 3.82289 18.4636 3.41871 18.4636C3.01452 18.4636 2.68687 18.1359 2.68687 17.7317V6.09545C2.68687 5.69127 3.01452 5.36361 3.41871 5.36361Z"
    fill="currentColor"
  />
</svg> `;
const h3 = html`<svg
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M4.04957 5.85587C4.04957 5.44177 3.71388 5.10608 3.29979 5.10608C2.88569 5.10608 2.55 5.44177 2.55 5.85587V17.7775C2.55 18.1916 2.88569 18.5273 3.29979 18.5273C3.71388 18.5273 4.04957 18.1916 4.04957 17.7775V12.5665H10.0562V17.7775C10.0562 18.1916 10.3919 18.5273 10.806 18.5273C11.2201 18.5273 11.5558 18.1916 11.5558 17.7775V11.8167V5.85587C11.5558 5.44177 11.2201 5.10608 10.806 5.10608C10.3919 5.10608 10.0562 5.44177 10.0562 5.85587V11.0669H4.04957V5.85587ZM13.5289 15.0901C13.1108 15.0901 12.8162 15.3942 12.8162 15.8218C12.8162 17.2759 14.6124 18.7585 17.0643 18.7585C19.7063 18.7585 21.55 17.1999 21.55 14.976C21.55 13.3414 20.324 11.9349 18.7179 11.7543V11.6592C20.0389 11.4312 21.1128 10.0626 21.1128 8.62759C21.1128 6.65084 19.4212 5.2348 17.0453 5.2348C14.7074 5.2348 13.1203 6.66034 13.1203 8.1334C13.1203 8.60859 13.4054 8.92221 13.8426 8.92221C14.2132 8.92221 14.4508 8.72263 14.6409 8.19993C15.021 7.22106 15.8763 6.66034 17.0073 6.66034C18.4613 6.66034 19.4402 7.53468 19.4402 8.83667C19.4402 10.1387 18.4328 11.0795 17.0453 11.0795H15.9239C15.4677 11.0795 15.1636 11.3741 15.1636 11.7923C15.1636 12.201 15.4867 12.5146 15.9239 12.5146H17.1118C18.7654 12.5146 19.8774 13.4934 19.8774 14.9475C19.8774 16.4016 18.7939 17.3329 17.0928 17.3329C15.8003 17.3329 14.8119 16.7627 14.3177 15.7458C14.0707 15.2611 13.8616 15.0901 13.5289 15.0901Z"
    fill="currentColor"
  />
</svg> `;
const h4 = html`<svg
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M18.7933 15.7548V17.6864C18.7933 18.2383 19.0787 18.5523 19.583 18.5523C20.0968 18.5523 20.3823 18.2383 20.3823 17.6864V15.7548H21.3719C21.9143 15.7548 22.2188 15.4884 22.2188 15.0317C22.2188 14.5654 21.9047 14.299 21.3719 14.299H20.3823V6.69626C20.3823 5.81134 19.897 5.31654 19.0311 5.31654C18.3746 5.31654 17.9369 5.602 17.3755 6.42983C15.2155 9.66503 14.3591 11.0352 12.9984 13.4426C12.6654 14.0516 12.5512 14.3846 12.5512 14.7367C12.5512 15.3647 13.046 15.7548 13.7882 15.7548H18.7933ZM18.7933 14.299H14.1498V14.2038C15.3963 12.0439 17.09 9.32248 18.7076 6.93414H18.7933V14.299ZM2.94953 5.70536C3.35312 5.70536 3.6803 6.03254 3.6803 6.43613V11.515H9.53462V6.43613C9.53462 6.03254 9.86179 5.70536 10.2654 5.70536C10.669 5.70536 10.9962 6.03254 10.9962 6.43613V12.2458V18.0555C10.9962 18.459 10.669 18.7862 10.2654 18.7862C9.86179 18.7862 9.53462 18.459 9.53462 18.0555V12.9766H3.6803V18.0555C3.6803 18.459 3.35312 18.7862 2.94953 18.7862C2.54593 18.7862 2.21875 18.459 2.21875 18.0555V6.43613C2.21875 6.03254 2.54593 5.70536 2.94953 5.70536Z"
    fill="currentColor"
  />
</svg> `;
const h5 = html`<svg
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M13.6153 15.0526C13.2062 15.0526 12.9366 15.3687 12.9366 15.8335C12.9366 17.135 14.4705 18.6316 16.9246 18.6316C19.5182 18.6316 21.3682 16.8096 21.3682 14.2439C21.3682 11.8362 19.7042 10.1443 17.343 10.1443C16.2739 10.1443 15.1863 10.5905 14.768 11.2134H14.675L15.0283 7.0766H20.0388C20.5873 7.0766 20.8941 6.8256 20.8941 6.37939C20.8941 5.92388 20.578 5.6543 20.0388 5.6543H14.8237C14.0243 5.6543 13.6246 5.97966 13.5688 6.66757L13.1598 11.8734C13.1133 12.5892 13.3829 13.0075 13.9127 13.0075C14.2102 13.0075 14.3961 12.8959 15.0747 12.2638C15.6139 11.7804 16.2553 11.5387 16.9804 11.5387C18.5886 11.5387 19.7321 12.6914 19.7321 14.3275C19.7321 16.038 18.5515 17.2279 16.8596 17.2279C15.7441 17.2279 14.8888 16.6887 14.3775 15.6941C14.1358 15.22 13.9313 15.0526 13.6153 15.0526ZM3.08209 5.90389C3.47639 5.90389 3.79603 6.22353 3.79603 6.61783V11.5797H9.51545V6.61783C9.51545 6.22353 9.83509 5.90389 10.2294 5.90389C10.6237 5.90389 10.9433 6.22353 10.9433 6.61783V12.2936V17.9695C10.9433 18.3638 10.6237 18.6834 10.2294 18.6834C9.83509 18.6834 9.51545 18.3638 9.51545 17.9695V13.0076H3.79603V17.9695C3.79603 18.3638 3.47639 18.6834 3.08209 18.6834C2.6878 18.6834 2.36816 18.3638 2.36816 17.9695V6.61783C2.36816 6.22353 2.6878 5.90389 3.08209 5.90389Z"
    fill="currentColor"
  />
</svg> `;
const h6 = html`<svg
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M17.6502 5.51672C14.5518 5.51672 12.8253 8.00853 12.8253 12.4975C12.8253 14.4294 13.1426 15.8759 13.7865 16.9025C14.5518 18.1064 15.8117 18.7597 17.3889 18.7597C19.9834 18.7597 21.7379 17.0145 21.7379 14.448C21.7379 12.0122 20.0767 10.3043 17.7062 10.3043C16.2503 10.3043 14.9158 11.107 14.4865 12.2455H14.4118C14.4398 8.75514 15.5411 6.92595 17.6222 6.92595C18.4528 6.92595 19.1528 7.22459 19.8247 7.8872C20.1607 8.21385 20.3567 8.3165 20.618 8.3165C21.0193 8.3165 21.3086 8.01786 21.3086 7.61656C21.3086 7.18726 20.9353 6.67397 20.3193 6.27266C19.6101 5.78737 18.6488 5.51672 17.6502 5.51672ZM17.4542 17.3598C15.8024 17.3598 14.6451 16.1746 14.6451 14.504C14.6451 12.8521 15.7744 11.6949 17.3889 11.6949C19.0501 11.6949 20.1327 12.8148 20.1327 14.5134C20.1327 16.2306 19.0594 17.3598 17.4542 17.3598ZM3.45463 5.99129C3.85047 5.99129 4.17137 6.31218 4.17137 6.70803V11.6894H9.91326V6.70803C9.91326 6.31218 10.2342 5.99129 10.63 5.99129C11.0259 5.99129 11.3467 6.31218 11.3467 6.70803V12.4061V18.1043C11.3467 18.5001 11.0259 18.821 10.63 18.821C10.2342 18.821 9.91326 18.5001 9.91326 18.1043V13.1229H4.17137V18.1043C4.17137 18.5001 3.85047 18.821 3.45463 18.821C3.05878 18.821 2.73788 18.5001 2.73788 18.1043V6.70803C2.73788 6.31218 3.05878 5.99129 3.45463 5.99129Z"
    fill="currentColor"
  />
</svg> `;
export const getIcon = (
    model: BaseBlockModel & { type?: string }
): TemplateResult => {
    if (model.flavour === 'affine:paragraph') {
        const type = model.type as ParagraphType;
        return (
            {
                text: text,
                quote: quote,
                h1: h1,
                h2: h2,
                h3: h3,
                h4: h4,
                h5: h5,
                h6: h6,
            } as Record<ParagraphType, TemplateResult>
        )[type];
    }
    if (model.flavour === 'affine:list') {
        return (
            {
                bulleted: bulleted,
                numbered: numbered,
                todo: todo,
                toggle: toggle,
            }[model.type ?? 'bulleted'] ?? html``
        );
    }
    return html``;
};
