import './ConfigList-module.css';

const ContainerList = () => {
    return (
        <div
            className="row flex-lg-nowrap"
            style={{ marginLeft: '-35%', marginTop: '10%' }}
        >
            <div className="col-12 col-lg-auto mb-3" style={{ width: '200px' }}>
                <div
                    className="card p-3"
                    style={{ borderRadius: '16px', width: '115%' }}
                >
                    <div className="e-navlist e-navlist--active-bg">
                        <ul className="nav">
                            <li className="nav-item">
                                <a
                                    className="nav-link px-2"
                                    href=""
                                    target="__blank"
                                >
                                    <i className="fa fa-fw fa-cog mr-1"></i>
                                    <span>Edit Profile</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContainerList;
