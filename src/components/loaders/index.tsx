import React from "react"
import ContentLoader from 'react-content-loader'




export const UserLoader = () => (
    <ContentLoader
        height={160}
        width={400}
        speed={2}
        primaryColor="#f3f3f3"
        secondaryColor="#ecebeb"
    >
        <rect x="0" y="0" rx="3" ry="3" width="70" height="10" />
        <rect x="80" y="0" rx="3" ry="3" width="100" height="10" />
        <rect x="190" y="0" rx="3" ry="3" width="10" height="10" />
        <rect x="15" y="20" rx="3" ry="3" width="130" height="10" />
        <rect x="155" y="20" rx="3" ry="3" width="130" height="10" />
        <rect x="15" y="40" rx="3" ry="3" width="90" height="10" />
        <rect x="115" y="40" rx="3" ry="3" width="60" height="10" />
        <rect x="185" y="40" rx="3" ry="3" width="60" height="10" />
        <rect x="0" y="60" rx="3" ry="3" width="30" height="10" />
    </ContentLoader>
)


export const ChartLoader = () => {
    return (
      <ContentLoader
        height={550}
        width={476}
        speed={2.5}
        primaryColor="#F7F7F8"
        secondaryColor="#EBEDEE"
      >
        <rect x="11" y="16" rx="5" ry="5" width="98" height="51" />
        <rect x="260" y="36" rx="5" ry="5" width="196" height="6" />
        <rect x="294" y="17" rx="5" ry="5" width="161" height="12" />
        <rect x="225" y="69" rx="5" ry="5" width="229" height="14" />
        <rect x="279" y="47" rx="5" ry="5" width="175" height="6" />
        <rect x="11" y="127" rx="5" ry="5" width="141" height="11" />
        <rect x="263" y="128" rx="5" ry="5" width="173" height="5" />
        <rect x="263" y="138" rx="5" ry="5" width="151" height="4" />
        <rect x="263" y="148" rx="5" ry="5" width="126" height="4" />
        <rect x="11" y="191" rx="5" ry="5" width="198" height="12" />
        <rect x="11" y="207" rx="5" ry="5" width="214" height="14" />
        <rect x="11" y="225" rx="5" ry="5" width="193" height="14" />
        <rect x="376" y="214" rx="5" ry="5" width="76" height="19" />
        <rect x="14" y="274" rx="5" ry="5" width="231" height="6" />
        <rect x="14" y="288" rx="5" ry="5" width="180" height="5" />
        <rect x="11" y="331" rx="5" ry="5" width="194" height="18" />
        <rect x="11" y="358" rx="5" ry="5" width="155" height="18" />
        <rect x="369" y="359" rx="5" ry="5" width="85" height="18" />
        <rect x="405" y="335" rx="5" ry="5" width="50" height="18" />
        <rect x="15" y="424" rx="5" ry="5" width="86" height="4" />
        <rect x="15" y="435" rx="5" ry="5" width="133" height="5" />
        <rect x="340" y="496" rx="5" ry="5" width="114" height="18" />
        <rect x="408" y="482" rx="5" ry="5" width="41" height="3" />
        <rect x="358" y="482" rx="5" ry="5" width="41" height="3" />
      </ContentLoader>
    )
  }