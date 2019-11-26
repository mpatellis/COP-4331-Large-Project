import React from 'react'
import MapComponent from './MapComponent'


export default () => {
    const [leftWidth, setLeftWidth] = React.useState(null)
    const separatorXPosition = React.useRef(null);
  
    const splitPaneRef = React.createRef();
  
    const onMouseDown = e => {
      separatorXPosition.current = e.clientX;
    };
  
    const onMouseMove = e => {
      if (!separatorXPosition.current) {
        return;
      }
  
      const newLeftWidth = leftWidth + e.clientX - separatorXPosition.current;
      separatorXPosition.current = e.clientX;
      setLeftWidth(newLeftWidth);
    };
  
    const onMouseUp = () => {
      separatorXPosition.current = null;
    };
  
    React.useEffect(() => {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
  
      return () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };
    });

    const MapSide = function SplitPaneLeft(props) {
        const leftRef = React.createRef();
      
        React.useEffect(() => {
          if (!leftWidth) {
            setLeftWidth(leftRef.current.clientWidth);
            leftRef.current.style.flex = "none";
            return;
          }    
          
          leftRef.current.style.width = `${leftWidth}px`;
        }, [leftWidth]);
      
        return <div  ref={leftRef} style={{width: '80%', height: '100%', background: '#dddddd', float:'left', flexGrow: 1}}>
        <MapComponent/>
        </div>;
      };

    

return (
    <div style={{width: '100%', height: '100%',  flexGrow: 1} }>
        <MapSide/>
        <div className="separator" onMouseDown={onMouseDown}  style={{float:'left', height: '100%'}}/>
        <div overflow={'hidden'} style={{ height: '100%', background: '#dddddd', flexGrow: 1}}>
        </div>
    </div>
)
}