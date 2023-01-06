import React, { ReactNode, useRef, useState } from 'react';

import classnames from 'classnames';

import { useOnScroll } from '@hooks';

// ScrollableSectionsProps is a type that represents the shape of the props that are passed
// to this component. It should contain the children prop, which is an array of elements to be
// rendered inside the component.
interface ScrollableSectionsProps {
  children: ReactNode;
}

/**
 * Returns an updated section index based on the given direction.
 *
 * @param direction - The direction to update the index. Can be either 'up' or 'down'.
 * @param currentSectionIndex - The current index of the section.
 * @param sections - An array of sections.
 * @returns The updated index of the section.
 */
function updateSectionIndex(
  direction: 'up' | 'down',
  currentSectionIndex: number,
  sections: any[],
): number {
  // If the direction is 'up' and the current index is greater than 0,
  // decrease the index by 1.
  if (direction === 'up' && currentSectionIndex > 0) {
    return currentSectionIndex - 1;
  }
  // If the direction is 'down' and the current index is less than the
  // length of the sections array minus 1, increase the index by 1.
  if (direction === 'down' && currentSectionIndex < sections.length - 1) {
    return currentSectionIndex + 1;
  }
  // Otherwise, return the current index.
  return currentSectionIndex;
}

/**
 * OpacityChangeSections is a functional component that is responsible for rendering a set of
 * scrollable sections that have their opacity changed as the user scrolls through them.
 */
const OpacityChangeSections: React.FC<ScrollableSectionsProps> = ({
  children,
}) => {
  // sectionsRef is a mutable ref object that will be used to store the DOM elements of the
  // sections. This will allow us to manipulate these elements later on.
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  // currentSectionIndex is a state variable that keeps track of the index of the section that
  // is currently visible.
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  const [isScrolling, setIsScrolling] = useState(false);

  // handleScroll is a callback function that will be passed to the useOnScroll hook. It will
  // be called whenever the user scrolls the page. It receives the direction of the scroll as
  // its argument.
  const handleScroll: Parameters<typeof useOnScroll>[0] = (direction) => {
    // If the user is currently scrolling, we return early.
    if (isScrolling) {
      return;
    }

    // newCurrentSectionIndex is the index of the next section that should be shown based on
    // the direction of the scroll and the index of the current section.
    const newCurrentSectionIndex = updateSectionIndex(
      direction,
      currentSectionIndex,
      sectionsRef.current,
    );

    // If the new current section index is the same as the current section index, we return
    // early.
    if (newCurrentSectionIndex === currentSectionIndex) {
      return;
    }

    // We set the isScrolling state variable to true to prevent the user from scrolling
    // multiple sections at once.
    setIsScrolling(true);

    // We set a timeout to set the isScrolling state variable to false after 1 second. This
    // will allow the user to change section again after 1 second.
    setTimeout(() => {
      setIsScrolling(false);
    }, 2000);

    // We update the currentSectionIndex state variable with the index of the next section.
    setCurrentSectionIndex(newCurrentSectionIndex);
  };

  // We call the useOnScroll hook and pass it the handleScroll callback function as its
  // argument. This will cause the handleScroll function to be called whenever the user scrolls different direction
  useOnScroll(handleScroll);

  // We map through the children prop and render a div element for each one of them. These div
  // elements will be the scrollable sections.
  return (
    <>
      {React.Children.map(children, (section, index) => {
        if (!React.isValidElement(section)) {
          return null;
        }

        // isCurrentSection is a boolean variable that will be used to determine if the current
        // section is the one that is currently visible.
        const isCurrentSection = index === currentSectionIndex;

        return (
          // We set the ref attribute of the div element to a callback function that will be
          // called with the DOM element of the div as its argument. This allows us to store
          // the DOM element in the sectionsRef object.
          <div
            ref={(section) => {
              if (!section) {
                return;
              }

              sectionsRef.current[index] = section;
            }}
            // We use the classnames library to dynamically set opacity of the div
            // element based on whether it is the current section or not.
            className={classnames([
              'transition-opacity duration-1000 ease-in-out absolute top-0 left-0 w-full h-full lg:overflow-hidden',
              {
                'opacity-100': isCurrentSection,
                'opacity-0': !isCurrentSection,
                // Prevent the section from being scrollable when it is not the current section.
                'overflow-hidden': !isCurrentSection,
              },
            ])}
          >
            {React.cloneElement(section)}
          </div>
        );
      })}
    </>
  );
};

export default OpacityChangeSections;
