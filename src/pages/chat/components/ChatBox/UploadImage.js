import {Upload, Icon, message, Button} from 'antd';
import connect from "react-redux/es/connect/connect";
import * as React from "react";
import {storage} from "../../../../client/firebase";
import {sendMessage} from "./chatBoxAction";

class UploadImage extends React.Component {
    onChange = (info) => {
        if (info.file.status !== 'uploading') {
            const uploadTask = storage.ref().child(info.file.name).put(info.file.originFileObj);
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log('File available at', downloadURL);
                this.props.sendMessage(1, this.props.toUser.userId, downloadURL);
            });
        }
    }

    render() {
        const props = {
            name: 'file',
            onChange: this.onChange,
            showUploadList: false
        };

        return (
            <div style={{display: 'inline-block'}}>
                <Upload {...props}>
                    <Button style={{height: '30px', background: '#211d18'}}>
                        <Icon type="upload"/>
                    </Button>
                </Upload>
            </div>
        );
    }

}


const mapStateToProps = (state) => {
    return {
        toUser: state.chatBox.toUser
    };
};

export default connect(mapStateToProps, {
    sendMessage
})(UploadImage);