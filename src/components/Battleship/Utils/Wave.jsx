import * as React from "react";
const Wave = (props) => (
  <>
    {" "}
    <svg
      id="svg2"
      className="hide"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width={
        props.width ||
        `${props.text.length * props.widthmodifier}px` ||
        `${props.text.length * 90}px`
      }
      height={props.height}
      xmlSpace="preserve"
      {...props}
    >
      <defs>
        <pattern
          id="water"
          width={0.25}
          height={1.1}
          patternContentUnits="objectBoundingBox"
        >
          <path
            fill="#000"
            d="M0.25,1H0c0,0,0-0.659,0-0.916c0.083-0.303,0.158,0.334,0.25,0C0.25,0.327,0.25,1,0.25,1z"
          />
        </pattern>
        <text
          id="text"
          transform="translate(2,116)"
          fontFamily="'Cabin Condensed'"
          fontSize={props.textsize || 120.047}
        >
          {props.text}
        </text>
        <mask id="text-mask">
          <use x={0} y={0} xlinkHref="#text" opacity={1} fill="#ffffff" />
        </mask>
        <g id="eff">
          <use x={0} y={0} xlinkHref="#text" fill={props.color} />
          <rect
            className="water-fill"
            mask="url(#text-mask)"
            fill="url(#water)"
            x={-300}
            y={50}
            width={1200}
            height={120}
            opacity={0.3}
          >
            <animate
              attributeType="xml"
              attributeName="x"
              from={-300}
              to={0}
              repeatCount="indefinite"
              dur="2s"
            />
          </rect>
          <rect
            className="water-fill"
            mask="url(#text-mask)"
            fill="url(#water)"
            y={45}
            width={1600}
            height={120}
            opacity={0.3}
          >
            <animate
              attributeType="xml"
              attributeName="x"
              from={-400}
              to={0}
              repeatCount="indefinite"
              dur="3s"
            />
          </rect>
          <rect
            className="water-fill"
            mask="url(#text-mask)"
            fill="url(#water)"
            y={55}
            width={800}
            height={120}
            opacity={0.3}
          >
            <animate
              attributeType="xml"
              attributeName="x"
              from={-200}
              to={0}
              repeatCount="indefinite"
              dur="1.4s"
            />
          </rect>
          <rect
            className="water-fill"
            mask="url(#text-mask)"
            fill="url(#water)"
            y={55}
            width={2000}
            height={120}
            opacity={0.3}
          >
            <animate
              attributeType="xml"
              attributeName="x"
              from={-500}
              to={0}
              repeatCount="indefinite"
              dur="2.8s"
            />
          </rect>
        </g>
      </defs>
      <use
        xlinkHref="#eff"
        opacity={0.9}
        style={{
          mixBlendMode: "color-burn",
        }}
      />
    </svg>
  </>
);
export default Wave;
