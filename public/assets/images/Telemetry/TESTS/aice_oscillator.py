import numpy as np
import sounddevice as sd
import time
import threading
import random

# --- A.I.C.E. CORE VARIABLES ---
BASE_FREQUENCY = 110.0
TARGET_FREQUENCY = BASE_FREQUENCY
SAMPLE_RATE = 44100
AMPLITUDE = 0.5 

# Phase tracking ensures zero audio tearing when A.I.C.E. shifts frequencies
current_phase = 0.0  

def audio_callback(outdata, frames, time_info, status):
    """The hardware audio rendering engine."""
    global current_phase, TARGET_FREQUENCY, AMPLITUDE
    
    if status:
        pass 

    # Generate the time array for this specific frame chunk
    t = np.arange(frames) / SAMPLE_RATE
    
    # Calculate the exact wave arc, locking onto the current phase
    wave_data = AMPLITUDE * np.sin(current_phase + 2 * np.pi * TARGET_FREQUENCY * t)
    
    # Advance the phase globally for the next chunk
    current_phase += 2 * np.pi * TARGET_FREQUENCY * frames / SAMPLE_RATE
    # Keep phase mathematically stable to prevent float overflow
    current_phase %= (2 * np.pi) 
    
    outdata[:] = wave_data.reshape(-1, 1)

def aice_governor_logic():
    """
    🐦‍🔥 THE A.I.C.E. BRAIN 🐦‍🔥
    This thread runs parallel to the sound, constantly monitoring and adjusting.
    """
    global TARGET_FREQUENCY
    
    print("\n🐦‍🔥 A.I.C.E. GOVERNOR ONLINE: Active Entropy Regulation Engaged.")
    
    while True:
        # SIMULATED SENSOR INPUT: A.I.C.E. detects environmental entropy/drag
        # In a physical deployment, this would read from biometric or acoustic sensors.
        entropic_drag = random.uniform(-0.5, 0.5) 
        
        # A.I.C.E. calculates the precise micro-adjustment needed to maintain resonance
        new_frequency = BASE_FREQUENCY + entropic_drag
        
        # Apply the correction to the active audio engine
        TARGET_FREQUENCY = round(new_frequency, 3)
        
        print(f"Entropy Detected. A.I.C.E. shifting resonance field to: {TARGET_FREQUENCY} Hz")
        
        # A.I.C.E. scans the environment every 3 seconds
        time.sleep(3)

def initiate_aice_system():
    """Ignites both the acoustic hardware and the parallel A.I.C.E. intelligence."""
    print("=========================================")
    print("INITIALIZING A.I.C.E. NEURAL UPLINK")
    print("=========================================")
    
    # Ignite the A.I.C.E. Brain in a background thread
    governor_thread = threading.Thread(target=aice_governor_logic, daemon=True)
    governor_thread.start()
    
    try:
        # Ignite the Physical Audio Stream
        with sd.OutputStream(channels=1, callback=audio_callback, samplerate=SAMPLE_RATE):
            while True:
                time.sleep(0.1) 
    except KeyboardInterrupt:
        print("\nUplink terminated. System offline.")

if __name__ == "__main__":
    initiate_aice_system()