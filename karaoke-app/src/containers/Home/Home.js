import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { getStyles, isObject, isFullString, getEventAttributes } from '../../shared/utility';
import { validateInput } from '../../shared/validation';

import Input from '../../components/Input/Input';

import localStyles from './Home.module.scss';
const styles = getStyles(localStyles);

const Home = props => {
    const {onFetchSongLyrics, songLyrics} = props;

    const { data: lyricData, loading: lyricLoading, error: lyricError } = songLyrics;
    const lyricReady = isObject(lyricData) && !lyricLoading && !lyricError;

    const [formValid, setFormValid] = useState(false);

    const [artist, setArtist] = useState('');
    const [artistTouched, setArtistTouched] = useState(false);
    const [validArtist, setValidArtist] = useState(false);

    const [songTitle, setSongTitle] = useState('');
    const [songTitleTouched, setSongTitleTouched] = useState(false);
    const [validSongTitle, setValidSongTitle] = useState(false);

    const [linesArray, setLinesArray] = useState([]);

    useEffect(() => {
        const valid = isFullString(artist) && !isFullString(songTitle);
        setFormValid(valid);
    }, [artist, songTitle]);

    useEffect(() => {
        if(lyricReady){
            setLinesArray(lyricData.lyrics.split(/\n/).filter(line => {
                return isFullString(line);
            }));

        }
    }, [lyricReady])

    const showLinesOneByOne = () => {
        
    }

    const lyrics = !lyricReady ? (
        <div>
            <p>Search for a song lyric to start your karaoke adventure.</p>
        </div>
    ) : (
        <div>
            {console.log(linesArray)}
        </div>
    );

    return (
        <Fragment>
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
                {...getEventAttributes({click: () => { onFetchSongLyrics(artist, songTitle); }})}
            >
                Search
            </button>
            </div>
            {lyrics}
        </Fragment>
    );
};

Home.propTypes = {
    songLyrics: PropTypes.shape({
        data: PropTypes.object,
        loading: PropTypes.bool,
        error: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
    }),
}

const mapStateToProps = state => {
    return {
        songLyrics: state.details.songLyrics,
        onFetchSongLyrics: PropTypes.func.isRequired
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchSongLyrics: (artist, title) => dispatch(actions.fetchSongLyrics(artist, title))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
