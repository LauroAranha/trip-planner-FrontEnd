import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import EditRoadmapForm from './EditRoadmapForm';

const EditRoadmapModal = (props) => {
    const { open, handleClose, modalInformation } = props;
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '2px solid #85F4FF',
        boxShadow: 24,
        borderRadius: 5,
        pt: 2,
        px: 4,
        pb: 3,
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
            className=""
        >
            <Box
                sx={{
                    ...style,
                    width: '80%',
                    height: '80%',
                    overflowY: 'scroll',
                }}
            >
                <div className="modal-header">
                    <h2
                        className="modal-title"
                        
                    >
                        Editar roteiro: {modalInformation.title}
                    </h2>
                    <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                        onClick={handleClose}
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                <EditRoadmapForm
                    handleModalClose={handleClose}
                    props={modalInformation}
                />
                </div>
            </Box>
        </Modal>
    );
};

export default EditRoadmapModal;
