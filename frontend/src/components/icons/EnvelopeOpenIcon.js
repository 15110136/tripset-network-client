import React from "react";
import theme from "theme";

/**
 * Envelope open (message) icon
 *
 * @param {string} width
 * @param {string} color
 */
export const EnvelopeOpenIcon = ({ width, color }) => {
  const DEFAULT_WIDTH = "23";
  const DEFAULT_COLOR = theme.colors.text.secondary;

  return (
    // <svg
    //   width={width || DEFAULT_WIDTH}
    //   fill={theme.colors[color] || DEFAULT_COLOR}
    //   xmlns="http://www.w3.org/2000/svg"
    //   viewBox="0 0 512 512"
    // >
    //   <path d="M494.2 488V187c0-3.1-3.9-7-7.7-9.9L407.8 120V56.9c0-6.2-5.2-10.4-10.4-10.4h-89.7L262 13.2c-3.1-2.1-8.3-2.1-11.5 0l-45.7 33.3h-89.7c-6.2 0-10.4 5.2-10.4 10.4v62.4L25 177.2c-4.7 2.9-7.7 6.7-7.7 9.9v303c0 5.9 4.7 10 9.6 10.4h456.8c6.7-.1 10.5-5.3 10.5-12.5zm-19.8-282.3v263.6L302.3 331.5l172.1-125.8zm-7.7-18.3l-58.9 42.9v-86.2l58.9 43.3zM255.8 32.9l18.3 13.5h-36.7l18.4-13.5zM387 67.3v178.2l-131.2 95.6-131.2-95.6V67.3H387zM37.2 205.7l172.1 125.8L37.2 470.1V205.7zm67.6 25.4l-60.4-44 60.4-43.9v87.9zM55.9 480.6L226 343.7l23.5 17.2c4.5 3.4 7.9 3.4 12.5 0l23.5-17.2 171.1 136.9H55.9z" />
    //   <path d="M186.1 118.3h140.5v19.8H186.1zM186.1 181.8h140.5v19.8H186.1zM186.1 245.3h140.5v19.8H186.1z" />
    // </svg>

    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 230 230"
      width={width || DEFAULT_WIDTH}
      fill={theme.colors[color] || DEFAULT_COLOR}
    >
      <path d="M111.524 0C50.457 0 .774 46.954.774 104.669c0 31.077 14.472 60.346 39.705 80.3a7.498 7.498 0 0 0 10.535-1.23 7.5 7.5 0 0 0-1.23-10.535c-21.613-17.092-34.01-42.072-34.01-68.534 0-49.445 42.953-89.67 95.75-89.67 52.793 0 95.743 40.225 95.743 89.669 0 49.448-42.95 89.678-95.743 89.678a101.97 101.97 0 0 1-27.076-3.635 7.5 7.5 0 0 0-5.688.705l-31.064 17.597a7.5 7.5 0 0 0 7.392 13.052l28.42-16.099a117.168 117.168 0 0 0 28.016 3.38c61.064 0 110.743-46.958 110.743-104.678C222.267 46.954 172.588 0 111.524 0z"/><path d="M114.67 71.85a7.498 7.498 0 0 0-8.002 1.083l-57.89 49.056a7.5 7.5 0 1 0 9.697 11.443l45.541-38.591v35.852a7.5 7.5 0 0 0 12.349 5.722l57.895-49.056a7.5 7.5 0 0 0-9.697-11.445l-45.547 38.593V78.655a7.496 7.496 0 0 0-4.346-6.805z"/></svg>
  );
};
