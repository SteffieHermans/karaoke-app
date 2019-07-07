import React, {useState, useEffect} from 'react';
import propTypes from 'prop-types';
import {getStyles, isFullString, getEventAttributes} from '../../shared/utility';
import { validateInput } from '../../shared/validation';

import Input from '../Input/Input';

import localStyles from './Search.module.scss';
import { fetchSongLyrics } from '../../store/actions';
const styles = getStyles(localStyles);

const Search = props => {
    const [formValid, setFormValid] = useState(false);

    const [artist, setArtist] = useState('');
    const [artistTouched, setArtistTouched] = useState(false);
    const [validArtist, setValidArtist] = useState(false);

    const [songTitle, setSongTitle] = useState('');
    const [songTitleTouched, setSongTitleTouched] = useState(false);
    const [validSongTitle, setValidSongTitle] = useState(false);

    useEffect(() => {
        const valid = isFullString(artist) && !isFullString(songTitle);
        setFormValid(valid);
    }, [artist, songTitle]);

    return (
        <div>
            <Input
                value={artist}
                required={true}
                invalid={!validArtist}
                touched={artistTouched}
                label={'Artist'}
                events={{
                    change: (event) => {
                        const value = event.target.value;
                        const valid = validateInput(value, { required: true, minLength: 1 });
                        setArtistTouched(true);
                        setValidArtist(valid);
                        setArtist(value);
                    },
                    blur: (event) => {
                        const value = event.target.value.trim();
                        const valid = validateInput(value, { required: true, minLength: 1 });
                        setArtistTouched(true);
                        setArtist(valid);
                        setArtist(value);
                    }
                }}
            />
            <Input
                value={songTitle}
                required={true}
                invalid={!validSongTitle}
                touched={songTitleTouched}
                label={'Song Title'}
                events={{
                    change: (event) => {
                        const value = event.target.value;
                        const valid = validateInput(value, { required: true, minLength: 1 });
                        setSongTitleTouched(true);
                        setValidSongTitle(valid);
                        setSongTitle(value);
                    },
                    blur: (event) => {
                        const value = event.target.value.trim();
                        const valid = validateInput(value, { required: true, minLength: 1 });
                        setSongTitleTouched(true);
                        setValidSongTitle(valid);
                        setSongTitle(value);
                    }
                }}
            />
            <button
                disabled={formValid}
                {...getEventAttributes({click: () => { console.log('going to fetch song lyric'); fetchSongLyrics(artist, songTitle); }})}
            >
                Search
            </button>
        </div>
    );
};

Search.propTypes = {
    fetchSongLyrics: propTypes.func.isRequired
}

export default Search;