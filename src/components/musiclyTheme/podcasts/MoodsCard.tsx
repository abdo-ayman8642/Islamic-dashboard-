'use client';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import { Audio } from 'models/api';

interface AudioCard {
	audio: Audio;
	onClick: (data: Audio) => void;
	onDelete: (data: Audio) => void;
	onImage: (data: Audio) => void;
}
const MoodsCard = ({ audio, onClick, onDelete, onImage }: AudioCard) => {
	return (
		<div className="trending__item text-center round16 play-button-container">
			<div className="thumb ralt overhid transition">
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
				</div>
			</div>
			<div className="content mt-16">
				<h5>
					<div className=" d-block mb-1" style={{ fontSize: '18px', color: 'black' }}>
						{audio.title![0].value}
					</div>
				</h5>
			</div>
		</div>
	);
};

export default MoodsCard;
