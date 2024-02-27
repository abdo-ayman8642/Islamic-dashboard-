'use client';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import { Category } from 'models/api';

interface CategoryCardProp {
	category: Category;
	onClick: (data: Category) => void;
	onDelete: (data: Category) => void;
	onImage: (data: Category) => void;
}

const CategoryCard = ({ category, onClick, onDelete, onImage }: CategoryCardProp) => {
	return (
		<div className="trending__item text-center round16 play-button-container">
			<div className="thumb ralt overhid transition">
				<img
					src={category.thumbnail || '/img/pocast/q.png'}
					width={200}
					height={200}
					className="w-100  transition overhid  h-100 transition"
					style={{ width: '200px', aspectRatio: '1/1' }}
					alt="img"
				/>
				<div className="podcast__viwer d-flex align-items-center ">
					<span className="viewer fs-12 bodyfont white">
						{'number of albums'} {category.albums?.length}
					</span>
				</div>
				<div className="trending__bbar d-flex align-items-center justify-content-around">
					<div
						className="d-flex fs-16 fw-500 white align-items-center gap-3"
						onClick={() => onClick(category)}
						style={{ cursor: 'pointer' }}>
						<EditIcon />
					</div>
					<div
						className="d-flex fs-16 fw-500 white align-items-center gap-3"
						onClick={() => onImage(category)}
						style={{ cursor: 'pointer' }}>
						<ImageIcon />
					</div>
					<div
						className="d-flex fs-16 fw-500 white align-items-center gap-3"
						onClick={() => onDelete(category)}
						style={{ cursor: 'pointer' }}>
						<DeleteIcon />
					</div>
				</div>
			</div>
			<div className="content mt-16">
				<h5>
					<div className=" d-block mb-1" style={{ fontSize: '18px', color: 'black' }}>
						{category.title![0].value}
					</div>
				</h5>
			</div>
		</div>
	);
};

export default CategoryCard;
