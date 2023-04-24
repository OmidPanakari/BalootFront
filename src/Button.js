function Button(props) {
    return (<button className={props.className} type="button">
                {props.buttonName}
            </button>
    );
}

export default Button;
