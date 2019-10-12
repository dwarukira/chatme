import * as React from "react";

interface ErrorBoundaryProps {
    children?: React.ReactNode
}


interface ErrorBoundaryState {
    hasError: boolean
}


export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state = { hasError: false }


    static getDerivedStateFromError(error: Error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
      }
    
    componentDidCatch(error: Error, info: React.ErrorInfo) {
       
        // You can also log the error to an error reporting service
        console.error(error)
    }
    
    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1>Something went wrong in the Dashboard section.</h1>
        }
        return this.props.children
    }
}