CREATE TABLE Musicians (
    SSN INT PRIMARY KEY,
    Name VARCHAR(255),
    DateOfBirth DATE
);

CREATE TABLE Addresses (
    AddressID INT PRIMARY KEY,
    Street VARCHAR(255),
    City VARCHAR(255),
    State VARCHAR(255),
    ZipCode VARCHAR(255),
    MusicianSSN INT,
    FOREIGN KEY (MusicianSSN) REFERENCES Musicians(SSN)
);

CREATE TABLE FullTimeMusicians (
    SSN INT PRIMARY KEY,
    ContractStartDate DATE,
    ContractEndDate DATE,
    MonthlySalary DECIMAL(10,2),
    FOREIGN KEY (SSN) REFERENCES Musicians(SSN)
);

CREATE TABLE PartTimeMusicians (
    SSN INT PRIMARY KEY,
    WorkedHours INT,
    HourlyRate DECIMAL(10,2),
    FOREIGN KEY (SSN) REFERENCES Musicians(SSN)
);

CREATE TABLE Instruments (
    InstrumentID INT PRIMARY KEY,
    Type VARCHAR(255),
    IsStudioOwned BOOLEAN,
    PurchaseDate DATE,
    Price DECIMAL(10,2),
    MusicianSSN INT,
    FOREIGN KEY (MusicianSSN) REFERENCES Musicians(SSN)
);

CREATE TABLE Albums (
    AlbumID INT PRIMARY KEY,
    Title VARCHAR(255),
    Speed INT,
    CopyrightDate DATE,
    MusicianSSN INT,
    FOREIGN KEY (MusicianSSN) REFERENCES Musicians(SSN)
);

CREATE TABLE Songs (
    SongID INT PRIMARY KEY,
    Title VARCHAR(255),
    ProductionDate DATE
);

CREATE TABLE AlbumSongs (
    AlbumID INT,
    SongID INT,
    PRIMARY KEY (AlbumID, SongID),
    FOREIGN KEY (AlbumID) REFERENCES Albums(AlbumID),
    FOREIGN KEY (SongID) REFERENCES Songs(SongID)
);

CREATE TABLE SongMusicians (
    SongID INT,
    MusicianSSN INT,
    Payment DECIMAL(10,2),
    PRIMARY KEY (SongID, MusicianSSN),
    FOREIGN KEY (SongID) REFERENCES Songs(SongID),
    FOREIGN KEY (MusicianSSN) REFERENCES Musicians(SSN)
);
