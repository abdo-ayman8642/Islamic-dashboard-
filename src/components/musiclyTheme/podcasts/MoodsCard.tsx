'use client';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Audio } from 'models/api';

interface AudioCard {
	audio: Audio;
	onClick: (data: Audio) => void;
	onDelete: (data: Audio) => void;
	onImage: (data: Audio) => void;
	onPlay: (data: Audio) => void;
}
const MoodsCard = ({ audio, onClick, onDelete, onImage, onPlay }: AudioCard) => {
	return (
		<div className="trending__item text-center round16 play-button-container" style={{ position: 'relative' }}>
			<div className="thumb ralt overhid transition" style={{ position: 'relative' }}>
				<img
					src={audio.thumbnail || '/img/pocast/q.png'}
					width={150}
					height={150}
					className="w-80  transition overhid  h-80 transition"
					style={{ width: '150px', aspectRatio: '1/1' }}
					alt="img"
				/>

				<div className="trending__bbar d-flex align-items-center justify-content-around">
					<div
						className="d-flex fs-16 fw-500 white align-items-center gap-3"
						onClick={() => onClick(audio)}
						style={{ cursor: 'pointer' }}>
						<EditIcon />
					</div>
					<div
						className="d-flex fs-16 fw-500 white align-items-center gap-3"
						onClick={() => onImage(audio)}
						style={{ cursor: 'pointer' }}>
						<ImageIcon />
					</div>
					<div
						className="d-flex fs-16 fw-500 white align-items-center gap-3"
						onClick={() => onDelete(audio)}
						style={{ cursor: 'pointer' }}>
						<DeleteIcon />
					</div>
					<div
						className="d-flex fs-16 fw-500 white align-items-center gap-3"
						onClick={() => onPlay(audio)}
						style={{ cursor: 'pointer' }}>
						<PlayArrowIcon />
					</div>
				</div>
				{!audio.isFree && (
					<div
						style={{
							position: 'absolute',
							width: '100%',
							height: '30px',
							backgroundColor: 'rgba(191,191,191,0.7)',
							top: 0,
							left: 0,
							fontSize: '22px',
							fontWeight: 500
						}}>
						Premium
					</div>
				)}
			</div>
			<div className="content mt-16">
				<h5>
					<div className=" d-block mb-1" style={{ fontSize: '18px', color: 'black' }}>
						{audio.title![0].value}
					</div>
				</h5>
			</div>
			{!audio.published && (
				<div
					style={{
						position: 'absolute',
						width: '30px',
						height: '30px',
						backgroundColor: 'red',
						top: 0,
						right: 0,
						borderRadius: '50%'
					}}
				/>
			)}
		</div>
	);
};

export default MoodsCard;
