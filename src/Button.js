function Button(props) {
    return (<button className={props.className} type = {props.type}>
                {props.buttonName}
            </button>
    );
}

export default Button;
