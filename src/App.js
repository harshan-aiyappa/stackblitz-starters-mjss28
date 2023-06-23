import React, { useState, useEffect, useRef, useCallback } from 'react';
import './style.css';
import CustomizedTooltip from './CustomizedTooltip';
import PanToolAltIcon from '@mui/icons-material/PanToolAlt';

export default function App() {
  const [open, setOpen] = React.useState(false);

  const arrayOfObjects = [
    {
      promptId: 1,
      buttonValues: [
        'Dog',
        'Cat',
        'Elephant',
        'Lion',
        'Tiger',
        'Rabbit',
        'Mouse',
        'Giraffe',
        'Horse',
        'Zebra',
        'Cow',
      ],
      buttonAnswer: 'Giraffe',
    },
    {
      promptId: 2,
      buttonValues: [
        'Monkey',
        'Giraffe',
        'Kangaroo',
        'Koala',
        'Panda',
        'Elephant',
        'Lion',
        'Tiger',
        'Rabbit',
        'Mouse',
        'Dog',
      ],
      buttonAnswer: 'Kangaroo',
    },
    {
      promptId: 3,
      buttonValues: [
        'Dolphin',
        'Shark',
        'Whale',
        'Octopus',
        'Seahorse',
        'Fish',
        'Jellyfish',
        'Crab',
        'Turtle',
        'Squid',
        'Seal',
      ],
      buttonAnswer: 'Seahorse',
    },
    {
      promptId: 4,
      buttonValues: [
        'Eagle',
        'Ostrich',
        'Penguin',
        'Flamingo',
        'Pelican',
        'Swan',
        'Parrot',
        'Hummingbird',
        'Peacock',
        'Sparrow',
        'Hawk',
      ],
      buttonAnswer: 'Flamingo',
    },
    {
      promptId: 5,
      buttonValues: [
        'Lizard',
        'Snake',
        'Turtle',
        'Crocodile',
        'Gecko',
        'Chameleon',
        'Iguana',
        'Komodo Dragon',
        'Alligator',
        'Salamander',
        'Anole',
      ],
      buttonAnswer: 'Komodo Dragon',
    },
    {
      promptId: 6,
      buttonValues: [
        'Rose',
        'Sunflower',
        'Tulip',
        'Daisy',
        'Lily',
        'Orchid',
        'Carnation',
        'Daffodil',
        'Peony',
        'Hibiscus',
        'Chrysanthemum',
      ],
      buttonAnswer: 'Sunflower',
    },
    {
      promptId: 7,
      buttonValues: [
        'Apple',
        'Orange',
        'Banana',
        'Grapes',
        'Strawberry',
        'Watermelon',
        'Pineapple',
        'Mango',
        'Kiwi',
        'Peach',
        'Pear',
      ],
      buttonAnswer: 'Orange',
    },
    {
      promptId: 8,
      buttonValues: [
        'Car',
        'Bicycle',
        'Motorcycle',
        'Truck',
        'Bus',
        'Train',
        'Airplane',
        'Boat',
        'Helicopter',
        'Subway',
        'Scooter',
      ],
      buttonAnswer: 'Truck',
    },
    {
      promptId: 9,
      buttonValues: [
        'Pizza',
        'Burger',
        'Sushi',
        'Pasta',
        'Steak',
        'Chicken',
        'Salad',
        'Sandwich',
        'Taco',
        'Soup',
        'Fries',
      ],
      buttonAnswer: 'Sushi',
    },
    {
      promptId: 10,
      buttonValues: [
        'Chair',
        'Table',
        'Sofa',
        'Desk',
        'Bed',
        'Cabinet',
        'Shelf',
        'Bench',
        'Stool',
        'Armchair',
        'Ottoman',
      ],
      buttonAnswer: 'Sofa',
    },
    {
      promptId: 11,
      buttonValues: [
        'Guitar',
        'Piano',
        'Violin',
        'Drums',
        'Flute',
        'Trumpet',
        'Saxophone',
        'Clarinet',
        'Cello',
        'Harp',
        'Accordion',
      ],
      buttonAnswer: 'Piano',
    },
    // Add more objects with buttonValues arrays here...
  ];

  console.log(arrayOfObjects);

  // References to button elements
  const buttonRefs = useRef([]);

  // State variables
  const [counter, setCounter] = useState(0);
  const [currentPromptButtons, setCurrentPromptButtons] = useState([]);
  const [targetButtonValue, setTargetButtonValue] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const [handPosition, setHandPosition] = useState({});
  const [resetPosition, setResetPosition] = useState(false);
  const [isBgGreen, setIsBgGreen] = useState(false);
  const [hiddenSetter, setHiddenSetter] = useState({
    display: null,
  });
  const [handUpDown, setHandUpDown] = useState(false);
  const [tooltipClassName, setTooltipClassName] = useState('R-st');

  const toolTipContent = 'choose the answer';

  // Show tooltip handler
  const showToolTipHandler = useCallback(() => {
    setShowTooltip(true);
    setHandUpDown(true);
    setTimeout(() => {
      setHiddenSetter({ display: 'none' });
    }, 1000 * 1.5);
  }, []);

  // Function to make the background green
  const makeBgGreen = () => {
    setIsBgGreen(true);
    setShowTooltip(false);
    // Reset states after a certain delay
    if (counter + 1 < arrayOfObjects.length) {
      setTimeout(() => {
        resetCursor();
        setIsBgGreen(false);
        setShowTooltip(false);
        setHiddenSetter({ display: null });
        setHandUpDown(false);
      }, 2000);
    }
  };

  // Function to reset cursor position
  const resetCursor = useCallback(() => {
    const cursor = document.getElementById('auto-cursor');
    cursor.style.visibility = 'visible';
    cursor.style.transition = 'all';
    cursor.style.left = `70%`;
    cursor.style.top = `80%`;
    setResetPosition(true);
    setHandPosition({ left: '70%', top: '80%' });
  }, []);

  // Function to move to the next prompt
  const nextPrompt = () => {
    const cursor = document.getElementById('auto-cursor');
    cursor.style.transition = 'all 1s';
    cursor.style.visibility = 'visible';
    cursor.style.left = `70%`;
    cursor.style.top = `80%`;
    let currentCounter = counter + 1;
    setCounter(currentCounter);
    let currentPrompt = arrayOfObjects[currentCounter];
    setCurrentPromptButtons(currentPrompt.buttonValues);
    setTargetButtonValue(currentPrompt.buttonAnswer);
    setShowTooltip(false);
    setResetPosition(false);
    setHandUpDown(false);
  };

  // Load data for the current prompt
  const loadData = useCallback(() => {
    const currentPrompt = arrayOfObjects[counter];
    setCurrentPromptButtons(currentPrompt.buttonValues);
    setTargetButtonValue(currentPrompt.buttonAnswer);
    setHandPosition({ left: '70%', top: '80%' });
  }, []);

  // Initialize data for the first prompt
  useEffect(() => {
    loadData();
  }, []);

  // Effect to move the cursor and click the target button
  useEffect(() => {
    const buttons = buttonRefs.current;
    const targetButton = buttons.find(
      (button) => button.value === targetButtonValue
    );

    if (targetButton) {
      moveCursorAndClick(targetButton);
    }
  }, [targetButtonValue]);

  const createClassNamesPostion = (DOMobj) => {
    console.log('I AM here :', typeof DOMobj[0]);
    setTooltipClassName(DOMobj[0]);
  };
  // Function to move the cursor and click a button
  const moveCursorAndClick = useCallback(
    (button) => {
      const cursor = document.getElementById('auto-cursor');
      const buttonPosition = button.getBoundingClientRect();
      const buttonCenterX = buttonPosition.left + buttonPosition.width / 2;
      const buttonCenterY = buttonPosition.top + buttonPosition.height / 2;

      cursor.style.transition = 'all 2s 1s';
      cursor.style.left = `${buttonCenterX}px`;
      cursor.style.top = `${buttonCenterY}px`;

      setTimeout(() => {
        showToolTipHandler();
      }, 1000 * 3);
    },
    [showToolTipHandler]
  );
  const controllersHandler = (val) => {
    setTooltipClassName(val);
  };
  console.log('setTooltipClassName :', tooltipClassName);

  // Update current prompt and trigger next prompt when resetPosition changes
  useEffect(() => {
    if (resetPosition) {
      nextPrompt();
    }
  }, [resetPosition]);
  return (
    <div className="container-body">
      {/* Banner */}
      <div className="banner">
        <h1>| Welcome to Harshan's Workshop |</h1>
        <p>| Discover amazing content and services. |</p>
        <h3 className="blinking-element">
          [ PROMPT ID : {arrayOfObjects[counter].promptId} ]
        </h3>
      </div>
      <div className="playground-flex">
        {currentPromptButtons.map((value, index) => {
          return (
            <CustomizedTooltip
              title={toolTipContent}
              placement="auto"
              open={showTooltip && value === targetButtonValue}
            >
              <button
                className={`mybutton ${
                  isBgGreen && value === targetButtonValue && handUpDown
                    ? 'greenBg'
                    : showTooltip && value === targetButtonValue
                    ? 'purpleBg'
                    : isBgGreen
                    ? 'grayBg'
                    : null
                }`}
                key={index}
                ref={(ref) => (buttonRefs.current[index] = ref)}
                value={value}
                disabled={
                  value === targetButtonValue && showTooltip ? false : true
                }
                onClick={
                  value === targetButtonValue && handUpDown
                    ? () => {
                        makeBgGreen();
                      }
                    : () => {}
                }
              >
                {value}
              </button>
            </CustomizedTooltip>
          );
        })}
      </div>
      <div
        className={`${showTooltip ? 'hand-fade-out' : ''}`}
        id="auto-cursor"
        style={{
          position: 'absolute',
          width: '4em',
          height: '4em',
          background: 'transparent',
          borderRadius: '5em',
          ...handPosition,
          ...hiddenSetter,
          borderRadius: '5em',
          // transform: rotate(349deg);
          transform: 'rotate(349deg)',
          // border: '3px solid red',
          zIndex: '100',
        }}
      >
        <PanToolAltIcon
          sx={{ color: '#d5bdaf', fontSize: '3em' }}
          className={`hand-icon-img ${handUpDown ? 'hand-upDown' : ''}`}
        />
        {/* <img
          className={`hand-icon-img ${handUpDown ? 'hand-upDown' : ''}`}
          src="https://www.linkpicture.com/q/pointing-hand-icon-cropped.jpg"
          alt="Cursor"
        /> */}
      </div>
    </div>
  );
}
