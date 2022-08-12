import React, { useState, useRef } from 'react'
import ReactTags from 'react-tag-autocomplete';
import { useGlobalMsg } from '../../util/hooks/useGlobalMsg';
import { useEffect } from 'react';


const tagClasses = {
    root: 'upload-tags uploadmodal-big--info-form--input--tags',
    rootFocused: 'upload-tags--focused',
    selected: 'upload-tags--selected',
    selectedTag: 'upload-tags--selected-tag',
    selectedTagName: 'upload-tags--selected-tag-name',
    search: 'upload-tags--search',
    searchWrapper: 'inputclass upload-tags--search--wrapper',
    searchInput: 'upload-tags--input',
    suggestions: 'upload-tags--suggestions',
    suggestionActive: 'upload-tags--is-active',
    suggestionDisabled: 'upload-tags--is-disabled'
  }

  

const SoundTags = () => {
    const [tagState, setTagState] = useState({
        tags: [
          
        ],
        suggestions: [
          
        ]
    });

    const tagRef = useRef();
    const setGlobalMsg = useGlobalMsg();

    const onAddTags = (tag) => {
        if (tagState.tags.length < 3) {
            const tags = [].concat(tagState.tags, tag);
            setTagState({ tags });
            
            
        } else {
            setGlobalMsg('Limit 3 custom tags', 'error')
        }
        
    }
    const onDeleteTags = (i) => {
        const tags = tagState.tags.slice(0);
        tags.splice(i, 1);
        setTagState({ tags });
    };

    useEffect(() => {
        if (tagState) {}
    }, [tagState])


    return (
        <ReactTags
            ref={tagRef}
            tags={tagState.tags}
            onAddition={onAddTags}
            onDelete={onDeleteTags}
            allowNew
            delimiters={['Enter', '13']}
            classNames={tagClasses}
        />
    )
}

export default React.memo(SoundTags)
