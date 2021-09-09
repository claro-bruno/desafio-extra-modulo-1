import { useState, useEffect } from 'react';
import { Button } from './Button';
import { api } from '../services/api';
import '../styles/sidebar.scss';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface PropsSideBar {
  selectedGenreId: number;
  onClickButton(id: number): void;
}

export function SideBar(props: PropsSideBar) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const { selectedGenreId, onClickButton } = props;

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);


  return (
    <>
       <nav className="sidebar">
        <span>Watch<p>Me</p></span>

        <div className="buttons-container">
          {genres.map((genre : GenreResponseProps) => (
            <Button
              key={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => onClickButton(genre.id)}
              selected={selectedGenreId === genre.id}
            />
          ))}
        </div>

      </nav>
    </>
   
  );
}