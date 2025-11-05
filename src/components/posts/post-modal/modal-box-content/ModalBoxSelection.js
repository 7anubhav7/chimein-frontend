import photo from '@assets/images/photo.png';
import gif from '@assets/images/gif.png';
import feeling from '@assets/images/feeling.png';
import video from '@assets/images/video.png';
import Input from '@components/input/Input';
import useDetectOutsideClick from '@hooks/useDetectOutsideClick';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Feelings from '@components/feelings/Feelings';
import { ImageUtils } from '@services/utils/image-utils.service';
import PropTypes from 'prop-types';
import { toggleGifModal } from '@redux/reducers/modal/modal.reducer';
import React from 'react';

const ModalBoxSelection = ({ setSelectedPostImage, setSelectedVideo }) => {
  // @ts-ignore
  const { feelingIsOpen, gifModalIsOpen } = useSelector((state) => state.modal);
  // @ts-ignore
  const { post } = useSelector((state) => state.post);
  const feelingsRef = useRef(null);
  // @ts-ignore
  const fileInputRef = useRef();
  // @ts-ignore
  const videoInputRef = useRef();
  const [toggleFeelings, setToggleFeelings] = useDetectOutsideClick(
    feelingsRef,
    feelingIsOpen
  );
  const dispatch = useDispatch();

  const fileInputClicked = () => {
    fileInputRef.current.click();
  };

  const videoInputClicked = () => {
    videoInputRef.current.click();
  };

  const handleFileChange = (event) => {
    ImageUtils.addFileToRedux(
      event,
      post,
      setSelectedPostImage,
      dispatch,
      'image'
    );
  };

  const handleVideoFileChange = (event) => {
    ImageUtils.addFileToRedux(event, post, setSelectedVideo, dispatch, 'video');
  };

  return (
    <>
      {toggleFeelings && (
        <div ref={feelingsRef}>
          <Feelings />
        </div>
      )}
      <div className="modal-box-selection" data-testid="modal-box-selection">
        <ul className="post-form-list" data-testid="list-item">
          <li
            className="post-form-list-item image-select"
            onClick={fileInputClicked}
          >
            <Input
              // @ts-ignore
              name="image"
              // @ts-ignore
              ref={fileInputRef}
              type="file"
              className="file-input"
              onClick={() => {
                if (fileInputRef.current) {
                  fileInputRef.current.value = null;
                }
              }}
              handleChange={handleFileChange}
            />
            <img src={photo} alt="" /> Photo
          </li>
          <li
            className="post-form-list-item"
            onClick={() => dispatch(toggleGifModal(!gifModalIsOpen))}
          >
            <img src={gif} alt="" /> Gif
          </li>
          <li
            className="post-form-list-item"
            onClick={() => setToggleFeelings(!toggleFeelings)}
          >
            <img src={feeling} alt="" /> Feeling
          </li>
          <li
            className="post-form-list-item image-select"
            onClick={videoInputClicked}
          >
            <Input
              // @ts-ignore
              name="video"
              ref={videoInputRef}
              type="file"
              className="file-input"
              onClick={() => {
                if (videoInputRef.current) {
                  videoInputRef.current.value = null;
                }
              }}
              handleChange={handleVideoFileChange}
            />
            <img src={video} alt="" /> Video
          </li>
        </ul>
      </div>
    </>
  );
};
ModalBoxSelection.propTypes = {
  setSelectedPostImage: PropTypes.func,
  setSelectedVideo: PropTypes.func,
};
export default ModalBoxSelection;
