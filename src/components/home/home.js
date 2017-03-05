import PageMenu from './pagemenu';
import Converter from '../converter/converter';

require('./home.scss');

/*
* Create `Home` page
* which contains `page menu` also the place that `Converter` component places in
*/
const Home = () =>
    <div className = "home">
        <PageMenu className="home-page-menu"/>
        <div className="home-container">
            <div className="content-full">
                <Converter />
            </div>
            <div>
                <h1>Currency converter in partial boxes</h1>
            </div>
            <div className="content-box">
                <div>
                    <Converter />
                </div>
                <div>
                    <Converter />
                </div>
            </div>
        </div>
    </div>

export default Home;