import { Typography } from "@material-ui/core";


class ItemTypography extends Component {

    render() {

        const { variant, children } = this.props;

        return (
            <Typography variant={ variant }>

                { children }

            </Typography>
        );

    }

}

export default ItemTypography;