'use client';

import { useCallback, useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { CircularProgress } from '@mui/material';
//import SmallLoader from "@/components/shared/SmallLoader";

import { Album, Audio } from 'models/api';
import { useParams } from 'react-router-dom';
import { addAudioFromAlbum, getAlbums, removeAudioFromAlbum } from 'framework/album';
import ExploreSection from 'components/musiclyTheme/explore/ExploreSection';
import FormRemove from './FormRemove';
import DialogModal from 'components/UI/DialogModal';
import toast from 'react-hot-toast';
import { getErrorTranslation } from 'helpers/utils';
import FormAdd from './FormAdd';
import { addAudio, getPodcasts } from 'framework/podcast';
import FormCreateAudio from './FormCreateAudio';

const AlbumDetails = () => {
	const queryClient = useQueryClient();
	const [loading, setLoading] = useState(false);
	const [album, setAlbum] = useState<Album | null>(null);

	const [openEditForm, setOpenEditForm] = useState<boolean>(false);
	const [openEditThumbnail, setOpenEditThumbnail] = useState<boolean>(false);
	const [audios, setAudios] = useState<Audio[]>([]);
	const [openDeleteForm, setOpenDeleteForm] = useState<boolean>(false);
	const [openForm, setOpenForm] = useState<boolean>(false);
	const [openCreateForm, setOpenCreateForm] = useState<boolean>(false);
	const [currAudio, setCurAudio] = useState<Audio | null>(null);
	const urlParams = useParams();
	const [error, setError] = useState(false);

	let slug: string = urlParams[`Albumsslug`] as string;

	const mutationRemoveAudioAlbum = useMutation({
		mutationFn: (data: any) => {
			return removeAudioFromAlbum(data);
		},
		onSuccess: () => {
			fetchAlbum();
		}
	});
	const mutationAddAudioAlbum = useMutation({
		mutationFn: (data: any) => {
			return addAudioFromAlbum(data);
		},
		onSuccess: () => {
			fetchAlbum();
		}
	});

	const mutationCreateAudio = useMutation({
		mutationFn: (createInput: FormData) => {
			return addAudio(createInput);
		},
		onSuccess: () => {
			fetchAlbum();
		}
	});

	const fetchAudios = useCallback(async () => {
		setLoading(true);

		try {
			const response = await queryClient.fetchQuery(['audios', { query: `` }], getPodcasts);
			setAudios(response.data);
			setLoading(false);
		} catch (err: Error | any) {
			// setAlert({
			// 	open: true,
			// 	message: err?.response?.data?.Message || err.message || 'Something went wrong',
			// 	type: 'error'
			// });
			setLoading(false);
			setError(true);
		}

		// eslint-disable-next-line
	}, []);

	const fetchAlbum = useCallback(async () => {
		setLoading(true);

		try {
			const response: any = await queryClient.fetchQuery(['album', { query: `/${slug}` }], getAlbums);
			setAlbum(response.data);
			setLoading(false);
		} catch (err: Error | any) {
			// Handle errors here
			setLoading(false);
		}

		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		fetchAlbum();
		fetchAudios();
		// eslint-disable-next-line
	}, []);

	const deleteAudioAlbumHandler = async (id: string) => {
		setOpenDeleteForm(false);
		setLoading(true);
		try {
			const res = await mutationRemoveAudioAlbum.mutateAsync({ albumId: id, audioId: currAudio?._id });
			if (res.Error) throw new Error(res.Message || 'Something went wrong');
			setLoading(false);
			toast.success('Successfully Removed Audio From Album');
		} catch (error: any) {
			setLoading(false);
			const code: string = error.response.data.data;
			toast.error(getErrorTranslation(code));
		}
	};

	const createAudioHandler = async (data: any) => {
		const formData = new FormData();
		setOpenCreateForm(false);
		setLoading(true);

		formData.append(
			'data',
			JSON.stringify({
				title: [
					{
						lang: 'en',
						value: data.titleEn
					},
					{
						lang: 'ar',
						value: data.titleAr
					}
				],
				description: [
					{
						lang: 'en',
						value: data.descriptionEn
					},
					{
						lang: 'ar',
						value: data.descriptionAr
					}
				],

				slug: data.slug,
				albums: [album?._id]
			})
		);

		data.thumbnail.length > 0 && formData.append('thumbnail', data.thumbnail[0]);
		data.audio.length > 0 && formData.append('audio', data.audio[0]);
		try {
			const res = await mutationCreateAudio.mutateAsync(formData);
			setLoading(false);
			toast.success('Successfully Created Audio Under This Album');
			if (res.Error) throw new Error(res.Message || 'Something went wrong');
		} catch (error: any) {
			setLoading(false);
			const code: string = error.response.data.data;
			toast.error(getErrorTranslation(code));
		}
	};

	const addAudioAlbumHandler = async (data: any) => {
		setOpenForm(false);
		setLoading(true);
		try {
			const res = await mutationAddAudioAlbum.mutateAsync({ albumId: album?._id, audioId: data?.audio });
			if (res.Error) throw new Error(res.Message || 'Something went wrong');
			setLoading(false);
			toast.success('Successfully Added Audio To Album');
		} catch (error: any) {
			setLoading(false);
			const code: string = error.response.data.data;
			toast.error(getErrorTranslation(code));
		}
	};

	const onRemoveHandler = (data: Audio) => {
		setOpenDeleteForm(true);
		setCurAudio(data);
	};

	// const handleOpenDeleteAlbum = (data: any) => {
	// 	setCurrCategory(data);
	// 	setOpenDeleteForm(true);
	// };

	// const handleCloseDeleteAlbum = () => {
	// 	setCurrCategory({} as Category);
	// 	setOpenDeleteForm(false);
	// };

	// const handleOpenImage = (data: any) => {
	// 	setCurrCategory(data);
	// 	setOpenEditThumbnail(true);
	// };

	// const handleOnClickCategory = (data: Category) => {
	// 	setCurrCategory(data);
	// 	setOpenEditForm(true);
	// };

	// const handleOnCloseEdit = () => {
	// 	setCurrCategory({} as Category);
	// 	setOpenEditForm(false);
	// };

	// const handleOnCloseEditImage = () => {
	// 	setCurrCategory({} as Category);
	// 	setOpenEditThumbnail(false);
	// };
	if (loading) {
		return (
			<div style={{ height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<CircularProgress size={40} />
			</div>
		);
	}
	if (!album) {
		return <div>Not Found</div>;
	}
	return (
		<section className="trending__section pr-24 pl-24 pb-100">
			{/* {openForm && (
				<DialogModal
					children={<Form onSubmitForm={onSubmit} />}
					onClose={() => setOpenForm(false)}
					open={openForm}
					title="Add Category"
				/>
			)} */}

			<div className="container-fluid">
				<div className="container-fluid">
					<div className="artist__allhead d-flex">
						<img
							src={album?.thumbnail || '/img/albumb/def_album.jpg'}
							alt="img"
							className=" flex-shrink-0"
							style={{ width: '200px', height: '200px' }}
						/>
						<div className="artist__allcontent d-flex gap-3" style={{ flexDirection: 'column' }}>
							<h3 style={{ color: 'black' }}>{album.title[0].value}</h3>
							{/* <span className="white fs-20 mb-16 fw-500 d-block">NLE Chappa</span> */}
							<p className="fs-16 bodyfont pra mb-10" style={{ color: '#535353' }}>
								{album.description[0].value}
							</p>
							{/* <ul className="artist__list mb-20">
              <li>Theme Forest</li>
              <li>3D Ocean</li>
              <li>Graphic River</li>
              <li>Code Canayon</li>
            </ul>
            <p className="pra fs-16 mb-10">
              In 1993, he joined the band Grey Daze as their lead vocalist and
              released two albums with them before departing in 1998. Later, in
              1999, Chester Bennington joined Linkin Park, a band formed by Mike
              Shinoda and Brad Delson, and became one of its most iconic
              members.
            </p> */}
							{/* <div className="d-flex mt-24 align-items-center gap-4">
              <Link href="" className="cmbtn d-flex gap-2">
                <span>
                  <IconPlayerPlay className="fs-24 base" />
                </span>
                <span>Play</span>
              </Link>
              <Link href="" className="cmbtn d-flex gap-2">
                <span>
                  <IconShare className="fs-24 base" />
                </span>
                <span>Share</span>
              </Link>
            </div> */}

							{/* <div
              className="d-flex mt-24 align-items-center gap-4"
              style={{ cursor: "pointer" }}
            >
              <div onClick={toggleFavourite} className="cmbtn d-flex gap-3">
                {isFavorite ? (
                  <>
                    <span>
                      <IconHeartFilled className="fs-24 base2" />
                    </span>

                    <span style={{ fontSize: "smaller" }}>
                      {t("remove_fav")}
                    </span>
                  </>
                ) : (
                  <>
                    <span>
                      <IconHeart className="fs-24 " />
                    </span>
                    <span style={{ fontSize: "smaller" }}>{t("add_fav")}</span>
                  </>
                )}
              </div>
              {toggleFavLoading && <SmallLoader />}
            </div> */}
						</div>
					</div>
				</div>
				<ExploreSection
					audios={album?.audios!}
					onRemove={onRemoveHandler}
					onAdd={() => setOpenForm(true)}
					onCreate={() => setOpenCreateForm(true)}
				/>
			</div>
			{openDeleteForm && (
				<DialogModal
					children={<FormRemove onSubmitForm={deleteAudioAlbumHandler} id={album._id} />}
					onClose={() => setOpenDeleteForm(false)}
					open={openDeleteForm}
					title="Remove Audio From Album"
				/>
			)}
			{openCreateForm && (
				<DialogModal
					fullScreen
					children={<FormCreateAudio onSubmitForm={createAudioHandler} />}
					onClose={() => setOpenCreateForm(false)}
					open={openCreateForm}
					title="Add New Audio To Album"
				/>
			)}
			{openForm && (
				<DialogModal
					fullScreen
					children={
						<FormAdd
							onSubmitForm={addAudioAlbumHandler}
							audios={audios.map((audio) => {
								return {
									label: audio.title[0].value,
									value: audio._id
								};
							})}
						/>
					}
					onClose={() => setOpenForm(false)}
					open={openForm}
					title="Add Audio To Album"
				/>
			)}
		</section>
	);
};

export default AlbumDetails;
