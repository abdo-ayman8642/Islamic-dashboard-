'use client';
import { Album } from 'models/api';
import MoodsCard2 from './MoodsCard';

interface FavouriteAudios {
	albums: Album[];
	onRemove: (data: Album) => void;
}

const ExploreSection = ({ albums, onRemove }: FavouriteAudios) => {
	return (
		<section className="explore__section custom__space pb-60 pr-24 pl-24 pt-0">
			<div
				className="header__text mb-24 d-flex align-items-center justify-content-between flex-wrap gap-2"
				style={{ margin: '20px', marginTop: '100px' }}>
				<h2 style={{ color: 'black', textTransform: 'capitalize' }}>Albums</h2>
			</div>
			{!!albums?.length ? (
				<div className="tab-content" id="myTabContent">
					<div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab">
						<div className="row " style={{ flexWrap: 'wrap' }}>
							{albums.map((audio: Album) => (
								<div key={audio._id} className="col-xxl-2 col-xl-2 col-lg-3 col-md-2 col-md-3 col-sm-4 ">
									<MoodsCard2 key={audio._id} album={audio} onRemove={onRemove} />
								</div>
							))}
						</div>
					</div>
				</div>
			) : (
				<div style={{ textAlign: 'center', fontSize: 'larger' }}>{'No Audios'}</div>
			)}
		</section>
	);
};

export default ExploreSection;
