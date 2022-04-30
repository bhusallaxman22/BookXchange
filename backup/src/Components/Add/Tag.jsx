/* eslint-disable no-use-before-define */
import React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import genere from './genere'


export default function Tags() {
    return (
        <div >

            <Autocomplete
                multiple
                id="tags-filled"
                options={genere.map((option) => option.genere)}
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                    ))
                }
                renderInput={(params) => (
                    <TextField {...params} variant="outlined" label="Tags" fullWidth placeholder="Select Tags" />
                )}
            />
        </div>
    );
}