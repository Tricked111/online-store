/******************************************************************************
 *                                  ITU
 * 
 *      Authors: Marina Kravchuk (xkravc02)
 * 
 *****************************************************************************/
import Spinner from 'react-bootstrap/Spinner'

export default function LoadingBox() {
    return (<Spinner animation="border" role="status">
        <span  className="visualyy-hidde"></span>
    </Spinner>)
}