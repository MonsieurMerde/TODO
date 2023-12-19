import React from "react";

class Menu extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <h1>
                    <center>
                    TODO
                    </center>
                </h1>
                <form>
                    <input type='text' name='search' placeholder='Search Project' />
                    <input type='submit' value='Search Project' />
                </form>
            </div>
        );
    }
}


// function Menu() {
//     return (
//         <div>
//             <h1>
//                 <center>
//                 TODO
//                 </center>
//             </h1>
//         </div>
//     );
// };

export default Menu;