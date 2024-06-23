import React from 'react';
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react';
import { Prices } from 'store/interface';
import { icons } from 'store/icons';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function CurrencyOptions({
  prices,
  selectedOption,
  setSelectedOption
}: {
  prices: Prices[];
  selectedOption: Prices;
  setSelectedOption: (value: Prices) => void;
}) {
  return prices.length > 0 ? (
    <Listbox value={selectedOption} onChange={setSelectedOption}>
      {({ open }) => (
        <React.Fragment>
          <Label className="block text-lg font-medium leading-6 text-gray-900">Choose currency</Label>
          <div className="relative mt-2">
            <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
              <span className="flex items-center">
                <>
                  <img src={icons[selectedOption?.currency]} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
                  <span className="ml-3 block truncate">{selectedOption?.currency}</span>
                </>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <img
                  width={12}
                  alt="down-arrow"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA8UlEQVR4nO3T20rDQBSF4e8JFKRordYTiqL4YL6l3gnijVZbT6ioeHiJSGAqY5jERlO8yYINgb3W+hMyQ6tW/6kZHKDTQFcndOWd3zSLY2QYovcHyALOQ9cp5uLlUViMZ/RLWC9k467D2HBRWOZzg34NSD9kij2DSUwP2JgAsoLbkvx60bxcAnvEZgVkFXeJ3D3WykJdXCZCr9hN+LfwlPBfhxevVLfkn71hL/Jt47kEsqTGEU3B3rGPHbwk9ld1IFVHNZ+PMFlDV+LrywaJ0qxJyFjz0U2fGuQn2AiLGlYOO4sgw2lAYthJmPy5VSu19QnKJIAirbc/YwAAAABJRU5ErkJggg=="
                />
              </span>
            </ListboxButton>

            <Transition show={open} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
              <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {prices.length > 0 ? (
                  prices.map((price, index) => (
                    <ListboxOption
                      key={`${price.currency}-${index}`}
                      className={({ focus }) =>
                        classNames(
                          focus ? 'bg-indigo-600 text-white' : '',
                          !focus ? 'text-gray-900' : '',
                          'relative cursor-default select-none py-2 pl-3 pr-9'
                        )
                      }
                      value={price}
                    >
                      {({ selectedOption }) => (
                        <>
                          <div className="flex items-center">
                            <img src={icons[price.currency]} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
                            <span
                              className={classNames(
                                selectedOption ? 'font-semibold' : 'font-normal',
                                'ml-3 block truncate'
                              )}
                            >
                              {price.currency}
                            </span>
                          </div>
                        </>
                      )}
                    </ListboxOption>
                  ))
                ) : (
                  <div></div>
                )}
              </ListboxOptions>
            </Transition>
          </div>
        </React.Fragment>
      )}
    </Listbox>
  ) : (
    <div></div>
  );
}
