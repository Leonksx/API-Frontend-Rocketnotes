import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {Header} from '../../components/Header';
import {Input} from '../../components/Input';
import {TextArea} from '../../components/TextArea';
import {NoteItem} from '../../components/NoteItem'
import {Section} from '../../components/Section'
import {Button} from '../../components/Button'
import {ButtonText} from '../../components/ButtonText'

import {api} from '../../services/api';

import {Container, Form} from './styles';

export function New() {
  const [title, setTitle] = useState([]);
  const [description, setDescription] = useState("");

  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState("");

  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  function handleAddLink() {
    setLinks(prevState => [...prevState, newLink]);
    setNewLink("");
  }

  function handleRemoveLink(deleted) {
    setLinks(prevState => prevState.filter(link => link !== deleted));
  }

  function handleAddTag() {
    setTags(prevState => [...prevState, newTag]);
    setNewTag("");
  }

  function handleRemoveTag(deleted) {
    setTags(prevState => prevState.filter(tags => tags !== deleted));
  }

  async function handleNewNote() {
    if(!title) {
      return alert("Please type a title.")
    }

    if(newLink) {
      return alert("You left a Link in the field but didn't add it! Add or leave the field empty.")
    }

    if(newTag) {
      return alert("You left a Tag in the field but didn't add it! Add or leave the field empty.")
    }

    
    await api.post("/notes", {
      title, 
      description, 
      tags, 
      links
    });

    alert("Note created successfully!");
    navigate(-1);
  }

  return (
    <Container>
      <Header/>

      <main>
        <Form>
          <header>
            <h1>Create Note</h1>

            <ButtonText 
              title="Back"
              onClick={handleBack}
            />

          </header>

          <Input 
            placeholder="Title"
            onChange={e => setTitle(e.target.value)}
          />

          <TextArea 
            placeholder="Comment"
            onChange={e => setDescription(e.target.value)}
          />
          
          <Section title="Links">
            {
              links.map((link, index) => (
              <NoteItem
                key={String(index)}
                value={link}
                onClick={() => handleRemoveLink(link)}
              />
              ))
            }
          <NoteItem isNew placeholder="New Link"
            value={newLink}
            onChange={e => setNewLink(e.target.value)}
            onClick={handleAddLink}
          />
          </Section>

          <Section title="Markers">
            <div className='tags'>
              {
                tags.map((tag, index) => (
                  <NoteItem 
                    key={String(index)}
                    value={tag}
                    onClick={() => handleRemoveTag(tag)}
                  />

                ))
              }

                <NoteItem 
                  isNew 
                  placeholder="New Tag" 
                  onChange={e => setNewTag(e.target.value)}
                  value={newTag}
                  onClick={handleAddTag}
                />
              </div>
          </Section>

          <Button 
            title="Save" 
            onClick={handleNewNote}  
          />
        </Form>
      </main>
    </Container>
  );
}