import cloudinary from 'cloudinary';
import { fileUpload } from "../../helpers/fileUpload";

cloudinary.config({ 
  cloud_name: 'dyiueusgf', 
  api_key: '388866634236447', 
  api_secret: 'h5bk9cwEH0i7XMYcp4oUKoPGrcw',
  secure: true
});

describe('Testing fileUpload', () => {
  
  test('should load a file and return an URL', async(done) => {
    
    const resp = await fetch('https://19yw4b240vb03ws8qm25h366-wpengine.netdna-ssl.com/wp-content/uploads/10-Free-To-Use-CORS-Proxies-1024x768.png');
    const blob = await resp.blob();

    const file = new File([blob], 'foto.png');
    const url = await fileUpload(file);

    expect( typeof url ).toBe('string');

    //Borrar imágen por id
    const segments = url.split('/');
    const imageId = segments[segments.length - 1].replace('.png','');
    
    cloudinary.v2.api.delete_resources(imageId, {}, () => { done() });
  });

  test('should return an error', async() => {
    const file = new File([], 'foto.png');
    const url = await fileUpload(file);

    expect( url ).toBe( null );

  })
  
})
