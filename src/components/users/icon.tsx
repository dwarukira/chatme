import React from "react"


export const UserIcon = ({ url }) => (
    <svg width="46"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        height="50" viewBox="0 0 46 50" id={url}>
        <use xlinkHref={`#icons_${url}`} />
        
        <defs>
            <pattern id={`pattern-${url}`} preserveAspectRatio="xMidYMid slice" width="100%" height="100%" viewBox="0 0 150 150">
                <image width="150" height="150" id={url} xlinkHref={url} />
            </pattern>
        </defs>
        <g id="Avatar" transform="translate(0)">
            <circle id="Userpic" cx="23" cy="23" r="23" transform="translate(0 4)" fill={`url(#${'pattern'}-${url})`} />
            <g id="Online" transform="translate(1)">
                <circle id={`${url}-2`} cx="8" cy="8" r="8" fill="#fff" />
                <circle id="Oval-2" data-name={`${url}-2`} cx="4" cy="4" r="4" transform="translate(4 4)" fill="#181c2f" opacity="0.2" />
            </g>
        </g>
    </svg>
)