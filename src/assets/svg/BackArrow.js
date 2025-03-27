import {Path, Svg, Rect} from 'react-native-svg';

const BackArrow = () => {
  return (
    <Svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Rect width="28" height="28" rx="14" fill="#EFF2F7" />
      <Path
        opacity="0.4"
        d="M10.5082 5.66663H17.4832C20.5248 5.66663 22.3332 7.47496 22.3332 10.5083V17.4833C22.3332 20.5166 20.5248 22.325 17.4915 22.325H10.5082C7.47484 22.3333 5.6665 20.525 5.6665 17.4916V10.5083C5.6665 7.47496 7.47484 5.66663 10.5082 5.66663Z"
        fill="#EFF2F7"
      />
      <Path
        d="M8.55833 13.5586L12.1333 9.98362C12.375 9.74195 12.775 9.74195 13.0167 9.98362C13.2583 10.2253 13.2583 10.6253 13.0167 10.867L10.5083 13.3753H19C19.3417 13.3753 19.625 13.6586 19.625 14.0003C19.625 14.342 19.3417 14.6253 19 14.6253H10.5083L13.0167 17.1336C13.2583 17.3753 13.2583 17.7753 13.0167 18.017C12.8917 18.142 12.7333 18.2003 12.575 18.2003C12.4167 18.2003 12.2583 18.142 12.1333 18.017L8.55833 14.442C8.44167 14.3253 8.375 14.167 8.375 14.0003C8.375 13.8336 8.44167 13.6753 8.55833 13.5586Z"
        fill="#002859"
      />
    </Svg>
  );
};

export default BackArrow;
