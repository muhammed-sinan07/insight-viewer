import nibabel as nib
import numpy as np
from scipy import ndimage

def load_nifti_file(filepath):
    """Load a 3D NIfTI image."""
    img = nib.load(filepath)
    data = img.get_fdata()
    return data

def normalize(volume):
    """Normalize the intensity of the volume (Min-Max scaling)."""
    min_val = np.min(volume)
    max_val = np.max(volume)
    volume = (volume - min_val) / (max_val - min_val)
    return volume.astype("float32")

def resize_volume(img, desired_depth=64, desired_width=128, desired_height=128):
    """Resize the 3D volume to the target dimensions."""
    # Get current dimensions
    current_depth = img.shape[-1]
    current_width = img.shape[0]
    current_height = img.shape[1]
    
    # Calculate depth factor
    depth = current_depth / desired_depth
    width = current_width / desired_width
    height = current_height / desired_height
    
    depth_factor = 1 / depth
    width_factor = 1 / width
    height_factor = 1 / height
    
    # Rotate if necessary (sometimes NIfTI files are oriented differently)
    img = ndimage.rotate(img, 90, reshape=False)
    
    # Resize across all three dimensions
    img = ndimage.zoom(img, (width_factor, height_factor, depth_factor), order=1)
    return img

def process_scan(path):
    """The full pipeline for one scan."""
    # 1. Load
    volume = load_nifti_file(path)
    # 2. Normalize
    volume = normalize(volume)
    # 3. Resize
    volume = resize_volume(volume)
    # 4. Add channel dimension (required for CNNs: [width, height, depth, channels])
    volume = np.expand_dims(volume, axis=-1)
    return volume
