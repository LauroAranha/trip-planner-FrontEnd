import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';



const editRoadmapModal = (props) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };
    return (
        <Modal
            open={open}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
        >
            <Box
                sx={{
                    ...style,
                    width: '50%',
                    height: '80%',
                    overflowY: 'scroll',
                }}
            >
                <h2
                    className="edit-roadmap-title"
                    style={{
                        display: 'flex',
                    }}
                >
                    <p
                        style={{
                            fontWeight: 'bold',
                            justifyContent: 'flex-start',
                        }}
                    >
                        Editar roteiro
                    </p>{' '}
                    <p
                        style={{
                            marginLeft: '10px',
                            fontWeight: 'lighter',
                            justifyContent: 'flex-start',
                        }}
                    >
                        {modalInformation.title}
                    </p>
                    <Button
                        onClick={handleClose}
                        style={{
                            position: 'flex',
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faClose}
                            className="nav-icon"
                            color="red"
                        />
                    </Button>
                </h2>
                <EditRoadmap handleModalClose={handleClose} props={modalInformation} />
            </Box>
        </Modal>)
}

export default editRoadmapModal;