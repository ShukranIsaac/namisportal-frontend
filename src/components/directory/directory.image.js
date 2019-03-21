import React, { Component } from 'react';
import { CardImg } from 'reactstrap';
import './image.css';

export class DirectoryImage extends Component {

    constructor(props) {
        super(props);
        this.imageHd = null;
    }

    componentDidMount() {
            
        const loaderImg = new Image();

        loaderImg.src = this.props.srcLoaded;
        loaderImg.onload = () => {

            const { srcLoaded } = this.props;
            
            if (srcLoaded !== null && srcLoaded !== undefined) {
                // this.imageHd.setAttribute('src', srcLoaded);
                // this.imageHd.classList.add('image-fade-in');
            }

        }

    };

    render() {

        const { imageHd } = this;
        const { srcLoaded, srcPreload } = this.props;

        return (
            <div className="image-container">

                {
                    imageHd !== null ? <CardImg src={ srcLoaded } /> : <CardImg src={ srcPreload } />
                }
            
            </div>
        )

    }

}